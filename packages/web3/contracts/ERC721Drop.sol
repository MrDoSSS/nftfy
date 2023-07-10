// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "erc721a-upgradeable/contracts/extensions/ERC721AQueryableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/finance/PaymentSplitterUpgradeable.sol";
import "operator-filter-registry/src/upgradeable/OperatorFiltererUpgradeable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

error InvalidEtherValue();
error MaxPerWalletOverflow();
error PhaseSupplyOverflow();
error TotalSupplyOverflow();
error InvalidProof();
error InvalidPhase();
error BurnNotAllowed();
error InvalidSupply();

struct Phase {
  uint64 supply;
  uint64 totalMinted;
  uint64 maxPerWallet;
  bytes32 root;
  bool isActive;
  uint256 price;
  string name;
}

contract ERC721Drop is
  ERC721AQueryableUpgradeable,
  PaymentSplitterUpgradeable,
  OwnableUpgradeable,
  OperatorFiltererUpgradeable
{
  string public baseTokenURI;
  uint64 public globalMaxPerWallet;
  bool public burnable;

  uint16 public numberPhases;
  uint16 public startPhaseId;

  mapping(uint16 => Phase) private _phases;
  mapping(uint16 => mapping(address => uint64)) private _numberMintedPerPhase;

  address[] private _withdrawAddresses;

  function initialize(
    string memory name_,
    string memory symbol_,
    address _deployer,
    address[] memory _payees,
    uint256[] memory _shares,
    address _operatorFilter
  ) public initializerERC721A initializer {
    __ERC721A_init(name_, symbol_);
    __Ownable_init();
    __PaymentSplitter_init(_payees, _shares);
    __OperatorFilterer_init(_operatorFilter, _operatorFilter != address(0));

    transferOwnership(_deployer);

    _withdrawAddresses = _payees;
  }

  /*//////////////////////////////////////////////////////////////
                         Public getters
  //////////////////////////////////////////////////////////////*/

  function totalMinted() external view returns (uint256) {
    return _totalMinted();
  }

  function numberMinted(address _owner) external view returns (uint256) {
    return _numberMinted(_owner);
  }

  function numberMintedPerPhases(address _owner) external view returns (uint256[] memory _perPhases) {
    _perPhases = new uint256[](numberPhases);

    for (uint16 i = startPhaseId; i < startPhaseId + numberPhases; ) {
      _perPhases[i] = _numberMintedPerPhase[i][_owner];

      unchecked {
        ++i;
      }
    }
  }

  function phases() external view returns (Phase[] memory _allPhases) {
    _allPhases = new Phase[](numberPhases);

    for (uint16 i = startPhaseId; i < startPhaseId + numberPhases; ) {
      _allPhases[i] = _phases[i];

      unchecked {
        ++i;
      }
    }
  }

  function maxTotalSupply() external view returns (uint64 _maxTotalSupply) {
    for (uint16 i = startPhaseId; i < startPhaseId + numberPhases; ) {
      _maxTotalSupply += _phases[i].supply;

      unchecked {
        ++i;
      }
    }
  }

  /*//////////////////////////////////////////////////////////////
                         Minting functions
  //////////////////////////////////////////////////////////////*/

  function mint(uint64 _quantity) external payable {
    uint16 _possiblePhaseIndex;
    Phase memory _possiblePhase;

    for (uint16 i; i < numberPhases; ) {
      Phase memory _phase = _phases[i];

      if (_phase.isActive && _phase.totalMinted < _phase.supply && _phase.root == bytes32(0)) {
        _possiblePhaseIndex = i;
        _possiblePhase = _phase;
        break;
      }

      unchecked {
        ++i;
      }
    }

    if (!_possiblePhase.isActive) {
      revert InvalidPhase();
    }

    if (msg.value < _possiblePhase.price * _quantity) {
      revert InvalidEtherValue();
    }

    _checkPhaseConditions(_possiblePhaseIndex, _possiblePhase, _quantity);

    _numberMintedPerPhase[_possiblePhaseIndex][msg.sender] += _quantity;
    _phases[_possiblePhaseIndex].totalMinted += _quantity;

    _safeMint(msg.sender, _quantity);
  }

  function mint(
    uint16[] calldata _phaseIndices,
    uint64[] calldata _quantities,
    bytes32[][] calldata _proofs
  ) public payable {
    uint16 _len = uint16(_phaseIndices.length);
    uint64 _totalQuantity;
    uint256 _balance = msg.value;

    if (_len > numberPhases || _len != _quantities.length || _len != _proofs.length) {
      revert();
    }

    for (uint16 i; i < _len; ) {
      uint16 _phaseIndex = _phaseIndices[i];

      if (_phaseIndex > numberPhases) {
        revert InvalidPhase();
      }

      Phase storage _phase = _phases[_phaseIndex];
      uint64 _quantity = _quantities[i];
      uint256 _price = _phase.price * _quantity;

      if (!_phase.isActive) {
        revert InvalidPhase();
      }

      if (_balance < _price) {
        revert InvalidEtherValue();
      }

      _checkPhaseConditions(_phaseIndex, _phase, _quantities[i], _proofs[i]);

      unchecked {
        _numberMintedPerPhase[_phaseIndex][msg.sender] += _quantity;
        _phase.totalMinted += _quantity;
        _totalQuantity += _quantity;
        _balance -= _price;
        ++i;
      }
    }

    _safeMint(msg.sender, _totalQuantity);
  }

  function burn(uint256 _tokenId) external {
    if (!burnable) {
      revert BurnNotAllowed();
    }

    _burn(_tokenId, true);
  }

  /*//////////////////////////////////////////////////////////////
                          Owner functions
  //////////////////////////////////////////////////////////////*/

  function setBaseURI(string calldata _baseTokenURI) external onlyOwner {
    baseTokenURI = _baseTokenURI;
  }

  function setBurnable(bool _burnable) external onlyOwner {
    burnable = _burnable;
  }

  function setGlobalMaxPerWallet(uint64 _globalMaxPerWallet) external onlyOwner {
    globalMaxPerWallet = _globalMaxPerWallet;
  }

  function setPhases(Phase[] calldata _newPhases, bool _resetEligibility) external onlyOwner {
    uint16 _len = uint16(_newPhases.length);

    uint16 _existingStartPhaseId = startPhaseId;
    uint16 _existingNumberPhases = numberPhases;

    uint16 _newStartPhaseId = _existingStartPhaseId;
    if (_resetEligibility) {
      _newStartPhaseId = _existingStartPhaseId + _existingNumberPhases;
    }

    numberPhases = uint16(_newPhases.length);
    startPhaseId = _newStartPhaseId;

    for (uint16 i = 0; i < _len; ) {
      Phase memory _newPhase = _newPhases[i];

      if (_phases[i].totalMinted > _newPhase.supply) {
        revert InvalidSupply();
      }

      _newPhase.totalMinted = _phases[i].totalMinted;
      _phases[i] = _newPhase;

      unchecked {
        ++i;
      }
    }

    if (_resetEligibility) {
      for (uint16 i = _existingStartPhaseId; i < _newStartPhaseId; ) {
        delete _phases[i];

        unchecked {
          ++i;
        }
      }
    } else {
      if (_existingNumberPhases > _newPhases.length) {
        for (uint16 i = _len; i < _existingNumberPhases; ) {
          delete _phases[_newStartPhaseId + i];

          unchecked {
            ++i;
          }
        }
      }
    }
  }

  function airdrop(uint16 _phaseIndex, address[] calldata _to, uint64[] calldata _quantities) external onlyOwner {
    Phase memory _phase = _phases[_phaseIndex];
    uint256 _len = _to.length;

    if (_len != _quantities.length) {
      revert();
    }

    for (uint256 i; i < _len; ) {
      uint64 _quantity = _quantities[i];

      if (_phase.totalMinted + _quantity > _phase.supply) {
        revert();
      }

      _phase.totalMinted += _quantity;

      _safeMint(_to[i], _quantity);

      unchecked {
        ++i;
      }
    }
  }

  function withdraw() external onlyOwner {
    for (uint256 i = 0; i < _withdrawAddresses.length; ) {
      address payable _withdrawAddress = payable(_withdrawAddresses[i]);

      if (releasable(_withdrawAddress) > 0) {
        release(_withdrawAddress);
      }

      unchecked {
        ++i;
      }
    }
  }

  /*//////////////////////////////////////////////////////////////
                         Internal functions
  //////////////////////////////////////////////////////////////*/

  function _verifyProof(bytes32 _root, bytes32[] memory _proof) private view returns (bool) {
    bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(msg.sender))));

    return MerkleProof.verify(_proof, _root, leaf);
  }

  function _checkPhaseConditions(
    uint16 _phaseIndex,
    Phase memory _phase,
    uint64 _quantity,
    bytes32[] memory _proof
  ) internal view {
    if (_phase.root != bytes32(0) && !_verifyProof(_phase.root, _proof)) {
      revert InvalidProof();
    }

    _checkPhaseConditions(_phaseIndex, _phase, _quantity);
  }

  function _checkPhaseConditions(uint16 _phaseIndex, Phase memory _phase, uint64 _quantity) internal view {
    if (
      _numberMinted(msg.sender) + _quantity > globalMaxPerWallet ||
      _numberMintedPerPhase[_phaseIndex][msg.sender] + _quantity > _phase.maxPerWallet
    ) {
      revert MaxPerWalletOverflow();
    }

    if (_phase.totalMinted + _quantity > _phase.supply) {
      revert PhaseSupplyOverflow();
    }
  }

  /*//////////////////////////////////////////////////////////////
                          Overriden ERC721A
  //////////////////////////////////////////////////////////////*/

  function _startTokenId() internal pure override returns (uint256) {
    return 1;
  }

  function _baseURI() internal view override returns (string memory) {
    return baseTokenURI;
  }

  /*//////////////////////////////////////////////////////////////
                        DefaultOperatorFilterer
  //////////////////////////////////////////////////////////////*/

  function setApprovalForAll(
    address operator,
    bool approved
  ) public override(ERC721AUpgradeable, IERC721AUpgradeable) onlyAllowedOperatorApproval(operator) {
    super.setApprovalForAll(operator, approved);
  }

  function approve(
    address operator,
    uint256 tokenId
  ) public payable override(ERC721AUpgradeable, IERC721AUpgradeable) onlyAllowedOperatorApproval(operator) {
    super.approve(operator, tokenId);
  }

  function transferFrom(
    address from,
    address to,
    uint256 tokenId
  ) public payable override(ERC721AUpgradeable, IERC721AUpgradeable) onlyAllowedOperator(from) {
    super.transferFrom(from, to, tokenId);
  }

  function safeTransferFrom(
    address from,
    address to,
    uint256 tokenId
  ) public payable override(ERC721AUpgradeable, IERC721AUpgradeable) onlyAllowedOperator(from) {
    super.safeTransferFrom(from, to, tokenId);
  }

  function safeTransferFrom(
    address from,
    address to,
    uint256 tokenId,
    bytes memory data
  ) public payable override(ERC721AUpgradeable, IERC721AUpgradeable) onlyAllowedOperator(from) {
    super.safeTransferFrom(from, to, tokenId, data);
  }
}

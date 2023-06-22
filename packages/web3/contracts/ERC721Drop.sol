// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "erc721a-upgradeable/contracts/extensions/ERC721AQueryableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/finance/PaymentSplitterUpgradeable.sol";
import "operator-filter-registry/src/upgradeable/DefaultOperatorFiltererUpgradeable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

error InvalidEtherValue();
error MaxPerWalletOverflow();
error CurrentSupplyOverflow();
error TotalSupplyOverflow();
error InvalidProof();

struct MintRules {
  uint64 supply;
  uint64 maxPerWallet;
  uint64 freePerWallet;
  uint256 price;
}

contract ERC721Drop is
  ERC721AQueryableUpgradeable,
  PaymentSplitterUpgradeable,
  OwnableUpgradeable,
  DefaultOperatorFiltererUpgradeable
{
  string public baseTokenURI;
  uint256 public maxTotalSupply;
  MintRules public mintRules;

  address[] private _withdrawAddresses;
  bytes32 private _root;

  function initialize(
    string memory name_,
    string memory symbol_,
    address _deployer,
    address[] memory _payees,
    uint256[] memory _shares
  ) public initializerERC721A initializer {
    __ERC721A_init(name_, symbol_);
    __Ownable_init();
    __PaymentSplitter_init(_payees, _shares);
    __DefaultOperatorFilterer_init();

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

  function nonFreeAmount(address _owner, uint256 _amount, uint256 _freeAmount) external view returns (uint256) {
    return _calculateNonFreeAmount(_owner, _amount, _freeAmount);
  }

  // function mintRules()
  //   external
  //   view
  //   returns (uint64 _supply, uint64 _maxPerWallet, uint64 _freePerWallet, uint256 _price)
  // {
  //   _supply = mintRules.supply;
  //   _maxPerWallet = mintRules.maxPerWallet;
  //   _freePerWallet = mintRules.freePerWallet;
  //   _price = mintRules.price;
  // }

  /*//////////////////////////////////////////////////////////////
                         Minting functions
  //////////////////////////////////////////////////////////////*/

  function mint(uint256 _amount) external payable {
    _customMint(_amount, mintRules.freePerWallet);
  }

  function mint(uint256 _amount, uint256 _freeAmount, bytes32[] memory _proof) external payable {
    _verifyWhitelist(_freeAmount, _proof);
    _customMint(_amount, _freeAmount);
  }

  /*//////////////////////////////////////////////////////////////
                          Owner functions
  //////////////////////////////////////////////////////////////*/

  function setBaseURI(string memory _baseTokenURI) external onlyOwner {
    baseTokenURI = _baseTokenURI;
  }

  function setMintRules(MintRules memory _mintRules) external onlyOwner {
    if (_totalMinted() + _mintRules.supply > maxTotalSupply) revert();

    mintRules = _mintRules;
  }

  function setMaxTotalSupply(uint256 _maxTotalSupply) external onlyOwner {
    maxTotalSupply = _maxTotalSupply;
  }

  function airdrop(address _to, uint256 _amount) external onlyOwner {
    if (_totalMinted() + _amount > maxTotalSupply) {
      revert TotalSupplyOverflow();
    }

    _safeMint(_to, _amount);
  }

  function setRoot(bytes32 _newRoot) external onlyOwner {
    _root = _newRoot;
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

  function _customMint(uint256 _amount, uint256 _freeAmount) internal {
    uint256 _nonFreeAmount = _calculateNonFreeAmount(msg.sender, _amount, _freeAmount);

    _checkMintConditions(_nonFreeAmount, _amount);

    _safeMint(msg.sender, _amount);
  }

  function _calculateNonFreeAmount(
    address _owner,
    uint256 _amount,
    uint256 _freeAmount
  ) internal view returns (uint256) {
    uint256 _freeAmountLeft = _numberMinted(_owner) >= _freeAmount ? 0 : _freeAmount - _numberMinted(_owner);

    return _freeAmountLeft >= _amount ? 0 : _amount - _freeAmountLeft;
  }

  function _verifyWhitelist(uint256 _freeAmount, bytes32[] memory _proof) private view {
    bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(msg.sender, _freeAmount))));

    if (!MerkleProof.verify(_proof, _root, leaf)) {
      revert InvalidProof();
    }
  }

  function _checkMintConditions(uint256 _amount, uint256 _nonFreeAmount) internal {
    if (_nonFreeAmount != 0 && msg.value < mintRules.price * _nonFreeAmount) {
      revert InvalidEtherValue();
    }

    if (_numberMinted(msg.sender) + _amount > mintRules.maxPerWallet) {
      revert MaxPerWalletOverflow();
    }

    if (_totalMinted() + _amount > mintRules.supply) {
      revert CurrentSupplyOverflow();
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

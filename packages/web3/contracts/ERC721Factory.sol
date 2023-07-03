// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./ERC721Drop.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC721Factory is Ownable {
  address public implementation;

  event ContractCreated(address creator, address contractAddress);

  constructor() {
    implementation = address(new ERC721Drop());
  }

  function clone(
    string memory _name,
    string memory _symbol,
    address[] memory _payees,
    uint256[] memory _shares,
    address _operatorFilter
  ) external returns (address) {
    address payable _clone = payable(Clones.clone(implementation));

    ERC721Drop(_clone).initialize(_name, _symbol, msg.sender, _payees, _shares, _operatorFilter);

    emit ContractCreated(msg.sender, _clone);

    return _clone;
  }
}

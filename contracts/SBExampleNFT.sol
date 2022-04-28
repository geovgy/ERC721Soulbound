//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC721Soulbound.sol";

contract SBExampleNFT is ERC721Soulbound {
  uint256 private _count;

  constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

  function mint(address to) external {
    uint256 tokenId = _count;
    _safeMint(to, tokenId);
    _count++;
  }
}
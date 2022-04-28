//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

/**
 * @title ERC721 Soulbound Token
 * @dev ERC721 Token that cannot be transferred to another non-zero address, only minted or burned.
 */
abstract contract ERC721Soulbound is ERC721Burnable {    
    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override virtual {
        require(address(0) == from || address(0) == to, "ERC721Souldbound: transfer to non-zero address");
    }
}

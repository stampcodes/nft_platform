// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract NftPlatform is ERC721, Ownable, ReentrancyGuard {
    string private baseURI;
    uint256 private totalNftSupply = 20;
    uint256 private tokenIdCounter;
    mapping(uint256 => string) private _tokenURIs;

    constructor(
        string memory _baseURI
    ) ERC721("Quantum Mad Labs", "QML") Ownable(msg.sender) {
        baseURI = _baseURI;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function mintAllNFTs() public onlyOwner {
        for (uint256 i = 0; i < totalNftSupply; i++) {
            tokenIdCounter++;
            uint256 currentTokenId = tokenIdCounter;
            _safeMint(msg.sender, currentTokenId);
            string memory newTokenURI = string(
                abi.encodePacked(
                    baseURI,
                    Strings.toString(currentTokenId),
                    ".json"
                )
            );
            _tokenURIs[currentTokenId] = newTokenURI;
        }
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        require(
            ownerOf(tokenId) != address(0),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return _tokenURIs[tokenId];
    }
}

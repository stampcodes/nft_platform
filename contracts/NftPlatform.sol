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
    mapping(uint256 => uint256) nftPrices;

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

    function setNftPrice(uint256 _tokenId, uint256 _nftPrice) public {
        require(msg.sender == ownerOf(_tokenId), "You are not the NFT owner");
        require(_nftPrice > 0, "Price must be greater than zero");
        nftPrices[_tokenId] = _nftPrice * 1 ether;
    }

    function getNftPrice(uint256 _tokenId) public view returns (uint256) {
        require(ownerOf(_tokenId) != address(0), "Token does not exist");
        return nftPrices[_tokenId] / 1 ether;
    }

    function getNftsForSale() public view returns (uint256[] memory) {
        uint256 totalMinted = tokenIdCounter;
        uint256 itemCount = 0;
        for (uint256 i = 0; i <= totalMinted; i++) {
            if (nftPrices[i] > 0) {
                itemCount++;
            }
        }
        uint256[] memory nftsForSale = new uint256[](itemCount);
        uint256 currentIndex = 0;
        for (uint256 i = 1; i <= totalMinted; i++) {
            if (nftPrices[i] > 0) {
                nftsForSale[currentIndex] = i;
                currentIndex++;
            }
        }
        return nftsForSale;
    }
}

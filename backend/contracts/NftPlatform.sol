// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract NftPlatform is ERC721, Ownable, ReentrancyGuard, IERC721Receiver {
    string private baseURI;
    uint256 private totalNftSupply = 20;
    uint256 private tokenIdCounter;
    mapping(uint256 => string) private _tokenURIs;
    mapping(uint256 => uint256) nftPrices;
    struct Auction {
        address payable seller;
        uint256 highestBid;
        address payable highestBidder;
        bool isActive;
        uint256 endTime;
        mapping(address => uint256) bids;
        address[] bidders;
        mapping(address => bool) isBidder;
    }
    mapping(uint256 => Auction) public auctions;

    event NFTPurchased(
        address indexed buyer,
        address indexed seller,
        uint256 tokenId,
        uint256 price
    );

    event AuctionCreated(
        address indexed seller,
        uint256 indexed tokenId,
        uint256 auctionEndTime
    );

    event BidPlaced(
        address indexed bidder,
        uint256 indexed tokenId,
        uint256 bidAmount
    );

    event AuctionEnded(
        address indexed winner,
        uint256 indexed tokenId,
        uint256 winningBid
    );

    event BidWithdrawn(
        address indexed bidder,
        uint256 indexed tokenId,
        uint256 withdrawnAmount
    );

    event BidWithdrawnByOwner(
        address indexed bidder,
        uint256 indexed tokenId,
        uint256 withdrawnAmount
    );

    constructor(
        string memory _baseURI
    ) ERC721("Quantum Mad Labs", "QML") Ownable(msg.sender) {
        baseURI = _baseURI;
    }

    function onERC721Received(
        address /*operator*/,
        address /*from*/,
        uint256 /*tokenId*/,
        bytes memory /*data*/
    ) public pure override returns (bytes4) {
        return this.onERC721Received.selector;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function mintAllNFTs() public onlyOwner {
        uint256 tempTokenIdCounter = tokenIdCounter;
        for (uint256 i = 0; i < totalNftSupply; i++) {
            tempTokenIdCounter++;
            uint256 currentTokenId = tempTokenIdCounter;
            _safeMint(address(this), currentTokenId);
            string memory newTokenURI = string(
                abi.encodePacked(
                    baseURI,
                    Strings.toString(currentTokenId),
                    ".json"
                )
            );
            _tokenURIs[currentTokenId] = newTokenURI;
        }
        tokenIdCounter = tempTokenIdCounter;
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

    function setNftPrice(uint256 _tokenId, uint256 _nftPrice) public onlyOwner {
        require(_nftPrice > 0, "Price must be greater than zero");
        nftPrices[_tokenId] = _nftPrice;
    }

    function getNftPrice(uint256 _tokenId) public view returns (uint256) {
        require(ownerOf(_tokenId) != address(0), "Token does not exist");
        return nftPrices[_tokenId];
    }

    function getNftDetails(
        uint256 _tokenId
    ) public view returns (uint256 tokenId, string memory uri, uint256 price) {
        require(ownerOf(_tokenId) != address(0), "Token does not exist");
        require(nftPrices[_tokenId] > 0, "NFT is not for sale");

        return (_tokenId, _tokenURIs[_tokenId], nftPrices[_tokenId]);
    }

    function getNftsForSaleWithDetails()
        public
        view
        returns (
            uint256[] memory tokenIds,
            string[] memory uris,
            uint256[] memory prices
        )
    {
        uint256 totalMinted = tokenIdCounter;
        uint256 itemCount = 0;

        for (uint256 i = 1; i <= totalMinted; i++) {
            if (nftPrices[i] > 0) {
                itemCount++;
            }
        }
        tokenIds = new uint256[](itemCount);
        uris = new string[](itemCount);
        prices = new uint256[](itemCount);

        uint256 currentIndex = 0;
        for (uint256 i = 1; i <= totalMinted; i++) {
            uint256 price = nftPrices[i];
            if (price > 0) {
                tokenIds[currentIndex] = i;
                uris[currentIndex] = _tokenURIs[i];
                prices[currentIndex] = price;
                currentIndex++;
            }
        }
    }

    function purchaseNft(uint256 _tokenId) public payable nonReentrant {
        require(
            ownerOf(_tokenId) == address(this),
            "Contract does not own the NFT"
        );
        require(msg.sender != ownerOf(_tokenId), "NFT is already yours");
        require(
            msg.value >= nftPrices[_tokenId],
            "Enter the correct amount of Ether"
        );
        uint256 nftPrice = nftPrices[_tokenId];
        uint256 excess = msg.value - nftPrice;
        nftPrices[_tokenId] = 0;
        _transfer(address(this), msg.sender, _tokenId);
        if (excess > 0) {
            payable(msg.sender).transfer(excess);
        }
        emit NFTPurchased(msg.sender, address(this), _tokenId, nftPrice);
    }

    function createAuction(
        uint256 _tokenId,
        uint256 _auctionDuration
    ) public onlyOwner {
        require(
            ownerOf(_tokenId) == address(this),
            "Contract does not own the NFT"
        );
        require(
            _auctionDuration >= 1 hours,
            "Auction duration must be at least 1 hour"
        );
        require(
            !auctions[_tokenId].isActive,
            "Auction already exists for this token"
        );
        Auction storage newAuction = auctions[_tokenId];
        newAuction.seller = payable(address(this));
        newAuction.highestBid = 0;
        newAuction.highestBidder = payable(address(0));
        newAuction.isActive = true;
        newAuction.endTime = block.timestamp + _auctionDuration;

        emit AuctionCreated(msg.sender, _tokenId, newAuction.endTime);
    }

    function bid(uint256 _tokenId) public payable nonReentrant {
        Auction storage auction = auctions[_tokenId];
        require(auction.isActive, "Auction is not active");
        require(block.timestamp < auction.endTime, "Auction has ended");
        require(
            msg.value > auction.highestBid,
            "Bid must be higher than the current highest bid"
        );
        if (auction.highestBidder != address(0)) {
            payable(auction.highestBidder).transfer(auction.highestBid);
        }
        auction.highestBid = msg.value;
        auction.highestBidder = payable(msg.sender);
        if (!auction.isBidder[msg.sender]) {
            auction.bidders.push(msg.sender);
            auction.isBidder[msg.sender] = true;
        }
        emit BidPlaced(msg.sender, _tokenId, msg.value);
    }

    function getBidders(
        uint256 _tokenId
    ) public view returns (address[] memory) {
        return auctions[_tokenId].bidders;
    }

    function getBid(
        uint256 _tokenId,
        address _bidder
    ) public view returns (uint256) {
        Auction storage auction = auctions[_tokenId];
        return auction.bids[_bidder];
    }

    function endAuction(uint256 _tokenId) public nonReentrant onlyOwner {
        Auction storage auction = auctions[_tokenId];
        require(auction.isActive, "Auction is already ended");
        auction.isActive = false;
        if (auction.highestBidder != address(0)) {
            _transfer(address(this), auction.highestBidder, _tokenId);
        }
        _clearAuction(_tokenId);
        emit AuctionEnded(auction.highestBidder, _tokenId, auction.highestBid);
    }

    function _clearAuction(uint256 _tokenId) internal {
        Auction storage auction = auctions[_tokenId];
        auction.highestBid = 0;
        auction.highestBidder = payable(address(0));
        auction.isActive = false;
        for (uint256 i = 0; i < auction.bidders.length; i++) {
            delete auction.bids[auction.bidders[i]];
        }
        delete auction.bidders;
    }

    function withdraw() public payable onlyOwner {
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "No funds to withdraw");
        payable(owner()).transfer(contractBalance);
    }
}

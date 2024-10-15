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

    function setNftPrice(uint256 _tokenId, uint256 _nftPrice) public onlyOwner {
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

    function purchaseNft(uint256 _tokenId) public payable nonReentrant {
        address currentNftOwner = ownerOf(_tokenId);
        require(ownerOf(_tokenId) != address(0), "Token does not exist");
        require(msg.sender != currentNftOwner, "NFT is already yours");
        require(
            msg.value >= nftPrices[_tokenId],
            "Enter the correct amount of Ether"
        );
        uint256 nftPrice = nftPrices[_tokenId];
        uint256 excess = msg.value - nftPrice;
        nftPrices[_tokenId] = 0;
        safeTransferFrom(currentNftOwner, msg.sender, _tokenId);
        payable(currentNftOwner).transfer(nftPrice);
        if (excess > 0) {
            payable(msg.sender).transfer(excess);
        }
        emit NFTPurchased(msg.sender, currentNftOwner, _tokenId, nftPrice);
    }

    function createAuction(uint256 _tokenId, uint256 _auctionDuration) public {
        require(msg.sender == ownerOf(_tokenId), "You are not the NFT owner");
        require(
            _auctionDuration >= 1 hours,
            "Auction duration must be at least 1 hour"
        );
        require(
            !auctions[_tokenId].isActive,
            "Auction already exists for this token"
        );
        Auction storage newAuction = auctions[_tokenId];
        newAuction.seller = payable(msg.sender);
        newAuction.highestBid = 0;
        newAuction.highestBidder = payable(address(0));
        newAuction.isActive = true;
        newAuction.endTime = block.timestamp + _auctionDuration;
        safeTransferFrom(msg.sender, address(this), _tokenId);
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
            auction.bids[auction.highestBidder] = auction.highestBid;
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

    function endAuction(uint256 _tokenId) public nonReentrant {
        Auction storage auction = auctions[_tokenId];
        require(auction.isActive, "Auction is already ended");
        auction.isActive = false;
        if (auction.highestBidder != address(0)) {
            auction.bids[auction.highestBidder] = 0;
            safeTransferFrom(address(this), auction.highestBidder, _tokenId);
            auction.seller.transfer(auction.highestBid);
        } else {
            safeTransferFrom(address(this), auction.seller, _tokenId);
        }
        emit AuctionEnded(auction.highestBidder, _tokenId, auction.highestBid);
    }

    function withdrawBid(uint256 _tokenId) public nonReentrant {
        Auction storage auction = auctions[_tokenId];
        uint256 amount = auction.bids[msg.sender];
        require(amount > 0, "No funds to withdraw");
        auction.bids[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
        emit BidWithdrawn(msg.sender, _tokenId, amount);
        for (uint256 i = 0; i < auction.bidders.length; i++) {
            if (auction.bidders[i] == msg.sender) {
                auction.bidders[i] = auction.bidders[
                    auction.bidders.length - 1
                ];
                auction.bidders.pop();
                break;
            }
        }
        if (auction.bidders.length == 0) {
            delete auction.bids[msg.sender];
            _clearAuction(_tokenId);
        }
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

    function withdrawBidByOwner(
        uint256 _tokenId,
        address _bidder
    ) public onlyOwner {
        Auction storage auction = auctions[_tokenId];
        uint256 amount = auction.bids[_bidder];
        require(amount > 0, "No funds to withdraw");
        auction.bids[_bidder] = 0;
        payable(_bidder).transfer(amount);
        emit BidWithdrawnByOwner(_bidder, _tokenId, amount);
    }
}

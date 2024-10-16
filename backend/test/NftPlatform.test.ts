import { expect } from "chai";
import { ethers } from "hardhat";
import { NftPlatform } from "../typechain-types";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { parseEther } from "ethers";

describe("NftPlatform", function () {
  async function deployNftPlatformFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const NftPlatform = await ethers.getContractFactory("NftPlatform");
    const nftPlatform = await NftPlatform.deploy("ipfs://baseURI/");
    await nftPlatform.waitForDeployment();

    return { nftPlatform, owner, addr1, addr2 };
  }

  it("Should mint all NFTs to the contract", async function () {
    const { nftPlatform } = await loadFixture(deployNftPlatformFixture);

    await nftPlatform.mintAllNFTs();

    const contractAddress = await nftPlatform.getAddress();

    for (let i = 1; i <= 20; i++) {
      expect(await nftPlatform.ownerOf(i)).to.equal(contractAddress);
    }
  });

  it("Should set and retrieve NFT price", async function () {
    const { nftPlatform, owner } = await loadFixture(deployNftPlatformFixture);

    await nftPlatform.mintAllNFTs();

    const tokenId = 1;
    const nftPrice = 1;

    await nftPlatform.setNftPrice(tokenId, nftPrice);

    const priceFromContract = await nftPlatform.getNftPrice(tokenId);
    expect(priceFromContract).to.equal(nftPrice);
  });

  it("Should list NFTs for sale", async function () {
    const { nftPlatform, owner } = await loadFixture(deployNftPlatformFixture);

    await nftPlatform.mintAllNFTs();

    await nftPlatform.setNftPrice(1, parseEther("1"));
    await nftPlatform.setNftPrice(2, parseEther("2"));

    const [tokenIds] = await nftPlatform.getNftsForSaleWithDetails();

    expect(tokenIds).to.include(1n);
    expect(tokenIds).to.include(2n);
  });

  it("Should allow purchase of an NFT", async function () {
    const { nftPlatform, addr1 } = await loadFixture(deployNftPlatformFixture);

    await nftPlatform.mintAllNFTs();

    const tokenId = 1;
    const nftPrice = 1;

    await nftPlatform.setNftPrice(tokenId, nftPrice);

    const priceFromContract = await nftPlatform.getNftPrice(tokenId);
    expect(priceFromContract).to.equal(nftPrice);

    const priceInWei = ethers.parseEther(nftPrice.toString());

    await nftPlatform
      .connect(addr1)
      .purchaseNft(tokenId, { value: priceInWei });

    expect(await nftPlatform.ownerOf(tokenId)).to.equal(addr1.address);
  });

  it("Should create an auction for an NFT", async function () {
    const { nftPlatform, owner } = await loadFixture(deployNftPlatformFixture);

    await nftPlatform.mintAllNFTs();

    const tokenId = 1;

    const auctionDuration = 3600;
    await nftPlatform.connect(owner).createAuction(tokenId, auctionDuration);

    const auction = await nftPlatform.auctions(tokenId);
    expect(auction.isActive).to.equal(true);
    expect(auction.seller).to.equal(nftPlatform.target);
  });

  it("Should allow placing a bid on an auction", async function () {
    const { nftPlatform, owner, addr2 } = await loadFixture(
      deployNftPlatformFixture
    );

    await nftPlatform.mintAllNFTs();

    const tokenId = 1;

    const auctionDuration = 3600;
    await nftPlatform.connect(owner).createAuction(tokenId, auctionDuration);

    const bidAmount = ethers.parseEther("1");
    await nftPlatform.connect(addr2).bid(tokenId, { value: bidAmount });

    const auction = await nftPlatform.auctions(tokenId);
    expect(auction.highestBid).to.equal(bidAmount);
    expect(auction.highestBidder).to.equal(addr2.address);
  });

  it("Should end the auction and transfer NFT to the highest bidder", async function () {
    const { nftPlatform, owner, addr2 } = await loadFixture(
      deployNftPlatformFixture
    );

    await nftPlatform.mintAllNFTs();

    const tokenId = 1;

    const auctionDuration = 3600;
    await nftPlatform.connect(owner).createAuction(tokenId, auctionDuration);

    const bidAmount = ethers.parseEther("1");
    await nftPlatform.connect(addr2).bid(tokenId, { value: bidAmount });

    await nftPlatform.connect(owner).endAuction(tokenId);

    const newOwner = await nftPlatform.ownerOf(tokenId);
    expect(newOwner).to.equal(addr2.address);

    const auction = await nftPlatform.auctions(tokenId);
    expect(auction.isActive).to.equal(false);
  });

  it("Should allow only the owner to withdraw funds", async function () {
    const { nftPlatform, owner, addr1 } = await loadFixture(
      deployNftPlatformFixture
    );

    await nftPlatform.mintAllNFTs();
    const tokenId = 1;
    const nftPrice = ethers.parseEther("1");

    await nftPlatform.setNftPrice(tokenId, nftPrice);

    await nftPlatform.connect(addr1).purchaseNft(tokenId, { value: nftPrice });

    await expect(nftPlatform.connect(addr1).withdraw())
      .to.be.revertedWithCustomError(nftPlatform, "OwnableUnauthorizedAccount")
      .withArgs(addr1.address);

    const initialOwnerBalance = await ethers.provider.getBalance(owner.address);

    const initialBalanceBigInt = BigInt(initialOwnerBalance.toString());

    await nftPlatform.connect(owner).withdraw();

    const finalOwnerBalance = await ethers.provider.getBalance(owner.address);

    const finalBalanceBigInt = BigInt(finalOwnerBalance.toString());

    const gasCostEstimate = BigInt(ethers.parseEther("0.001").toString());

    const expectedFinalBalance =
      initialBalanceBigInt + BigInt(nftPrice.toString()) - gasCostEstimate;

    expect(finalBalanceBigInt).to.be.closeTo(
      expectedFinalBalance,
      BigInt(ethers.parseEther("0.001").toString())
    );
  });

  it("Should handle ending an auction with no bids", async function () {
    const { nftPlatform, owner } = await loadFixture(deployNftPlatformFixture);

    await nftPlatform.mintAllNFTs();
    const tokenId = 1;

    const auctionDuration = 3600;
    await nftPlatform.connect(owner).createAuction(tokenId, auctionDuration);

    await ethers.provider.send("evm_increaseTime", [auctionDuration]);

    await nftPlatform.connect(owner).endAuction(tokenId);

    const auction = await nftPlatform.auctions(tokenId);
    expect(auction.isActive).to.equal(false);

    const nftOwner = await nftPlatform.ownerOf(tokenId);
    expect(nftOwner).to.equal(nftPlatform.target);
  });

  it("Should revert if the bid is less than or equal to the highest bid", async function () {
    const { nftPlatform, owner, addr2, addr1 } = await loadFixture(
      deployNftPlatformFixture
    );

    await nftPlatform.mintAllNFTs();
    const tokenId = 1;

    const auctionDuration = 3600;
    await nftPlatform.connect(owner).createAuction(tokenId, auctionDuration);

    const bidAmount = ethers.parseEther("1");
    await nftPlatform.connect(addr2).bid(tokenId, { value: bidAmount });

    const lowerBidAmount = ethers.parseEther("0.5");
    await expect(
      nftPlatform.connect(addr1).bid(tokenId, { value: lowerBidAmount })
    ).to.be.revertedWith("Bid must be higher than the current highest bid");

    const sameBidAmount = ethers.parseEther("1");
    await expect(
      nftPlatform.connect(addr1).bid(tokenId, { value: sameBidAmount })
    ).to.be.revertedWith("Bid must be higher than the current highest bid");
  });

  it("Should revert if trying to withdraw with no balance", async function () {
    const { nftPlatform, owner } = await loadFixture(deployNftPlatformFixture);

    await expect(nftPlatform.connect(owner).withdraw()).to.be.revertedWith(
      "No funds to withdraw"
    );
  });
});

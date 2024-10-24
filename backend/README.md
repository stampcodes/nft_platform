# Quantum Mad Labs NFT Backend

**Quantum Mad Labs** is a platform for creating and selling NFTs, with the ability to launch auctions for the NFTs themselves. The contract is written in Solidity and deployed on the Ethereum network (Sepolia) using Hardhat and Ignition for deployment. This project allows users to purchase pre-minted NFTs, participate in auctions for these NFTs, and view details about the available NFTs.

## Overview

This project offers:

- A limited collection of 20 NFTs.
- The ability to purchase NFTs directly or participate in an auction to acquire the desired NFT.
- Auction management with bidding and winning mechanisms based on Ether (ETH).

NFTs can either be purchased directly if listed for sale or acquired through auctions, where the highest bidder at the end of the auction wins the NFT.

## Features

- **Limited Collection**: Only 20 NFTs are available.
- **Direct Purchase**: Users can buy an NFT by paying its price in Ether.
- **NFT Auction**: Each NFT can be auctioned for a predefined period. Users can place bids, and the highest bidder at the end of the auction wins the NFT.
- **Price Management**: NFT prices are set and can be viewed through the platform.
- **Funds Withdrawal**: The contract owner can withdraw the funds accumulated through sales and auctions.

## Technology Stack

- **Solidity**: The language used to write the smart contracts.
- **Hardhat**: Framework for developing, testing, and deploying Ethereum smart contracts.
- **OpenZeppelin**: Libraries for managing ERC721 tokens and security functions.
- **Sepolia Testnet**: Ethereum test network used for smart contract deployment.
- **Ignition**: Tool for automating the deployment of smart contracts on Ethereum.

## Smart Contract Addresses

- **QuantumMadLabsNFT**: `0xEA6f144F17642cb56aea505C7Eaa8CF04B65C480`

## How to Use

1. Clone the repository:

   ```bash
   git clone https://github.com/stampcodes/nft_platform.git
   ```

2. Navigate to the project directory:

```bash
cd nft_platform/backend
```

3. Install the dependencies:

```bash
yarn
```

4. Set up the .env file with your private key and the Sepolia network endpoint.

5. Compile the contract:

```bash
yarn hardhat compile
```

6. Run tests to verify that everything works correctly:

```bash
yarn hardhat test
```

7. Deploy the contract on Sepolia using Ignition:

```bash
yarn hardhat ignition deploy ignition/modules/NftPlatformModule.ts --network sepolia
```

## Deployment

The contract is deployed on the Sepolia network using Hardhat and can be monitored via the contract address provided above. The NFT metadata is hosted on IPFS to ensure asset decentralization.

## License

Distributed under the MIT License.

## Contact

Project created by Andrea Fragnelli.

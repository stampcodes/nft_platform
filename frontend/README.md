# Quantum Mad Labs NFT Frontend

This is the frontend application for **Quantum Mad Labs**, built using modern web technologies and frameworks. It allows users to interact with the NFT platform, including purchasing NFTs, viewing the marketplace, and checking their transaction history.

## Overview

The frontend is built with **React** and **Vite** for fast development and efficient builds. It uses **TypeScript** for static type checking and **TailwindCSS** for styling. The app integrates with **wagmi**, **ethers.js**, and **Reown** for Web3 interactions, allowing users to connect their Ethereum wallets, and browse the NFT marketplace.

## Features

- **NFT Marketplace**: Users can browse and purchase NFTs directly from the marketplace.
- **Wallet Connection**: Integrates with various wallets via **wagmi** and **Reown**.
- **Purchase History**: Users can view their transaction history and see details of their past purchases.
- **Routing**: Navigation is handled using **React Router** to manage different pages of the app.
- **Responsive Design**: The app uses **TailwindCSS** to ensure a responsive and mobile-friendly interface.

## Technology Stack

- **React**: UI framework for building interactive user interfaces.
- **Vite**: A fast build tool for developing React applications.
- **TypeScript**: Adds static typing to JavaScript, improving code quality and maintainability.
- **TailwindCSS**: A utility-first CSS framework for building responsive and modern designs.
- **Wagmi**: React hooks for Ethereum development, used to interact with the blockchain.
- **Ethers.js**: A library for interacting with Ethereum smart contracts.
- **Reown**: Provides wallet connection options, allowing users to connect their Ethereum wallets.
- **React Router**: Handles routing between pages within the application.

## Key Dependencies

- `@reown/appkit`
- `@reown/appkit-adapter-wagmi`
- `@tanstack/react-query`
- `@wagmi/core`
- `@web3modal/wagmi`
- `ethers`
- `react`
- `react-dom`
- `react-router-dom`
- `viem`
- `wagmi`

## Project Structure

- **HomePage**: The landing page of the application.
- **NftMarketplacePage**: Displays the NFT marketplace where users can browse and purchase NFTs.
- **NftDetailsPage**: Shows detailed information about a specific NFT.
- **PurchaseHistoryPage**: Displays a list of the user’s past purchases and transaction history.

## How to Run the Project

1. Clone the repository:

```bash
git clone https://github.com/stampcodes/nft_platform.git
```

2. Navigate to the project directory:

```bash
cd nft_platform/frontend
```

3. Install the dependencies:

```bash
yarn
```

4. Set up the .env file

5. Start the development server:

```bash
yarn dev
```

6. Open the app in your browser at http://localhost:5173/

## License

Distributed under the MIT License.

## Contact

Project created by Andrea Fragnelli.

# Ticketing DApp

A decentralised ticketing system built on the Ethereum Sepolia testnet, using an ERC-20 smart contract to issue tickets as tokens.

This project follows the same structural and stylistic patterns as the lecturer's `web3examples` repository — each feature lives in its own folder with its own `index.html` and CSS, using jQuery and `web3.js` loaded from CDN.

## Project Structure

```
ticketing-dapp/
├── contracts/
│   └── TicketToken.sol         # ERC-20 contract with buy/return ticket logic
├── createWallet/               # Generate encrypted V3 keystore
│   ├── index.html
│   └── createWallet.css
├── checkBalance/               # Check SETH and TIX balance for any wallet
│   ├── index.html
│   └── checkBalance.css
├── buyTicket/                  # Load wallet, then buy ticket(s)
│   ├── index.html
│   └── buyTicket.css
├── returnTicket/               # Load wallet, then return ticket(s)
│   ├── index.html
│   └── returnTicket.css
├── index.html                  # Landing page with nav
└── README.md
```

## Setup

### 1. Deploy the smart contract

1. Open [Remix IDE](https://remix.ethereum.org).
2. Create a new file and paste the contents of `contracts/TicketToken.sol`.
3. Compile with Solidity `0.8.x`.
4. In the **Deploy** tab:
   - Set environment to **Injected Provider - MetaMask** (with MetaMask connected to Sepolia).
   - Constructor arguments:
     - `initialSupply` — number of tickets to mint (e.g. `100`)
     - `_ticketPrice` — price per ticket in wei (e.g. `10000000000000000` for 0.01 SETH)
5. Click **Deploy** and confirm in MetaMask.
6. Copy the deployed contract address.

### 2. Configure the frontend

Open `js/config.js` and replace `CONTRACT_ADDRESS` with your deployed contract address:

```js
const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000";
```

This is the single source of truth — all pages import from this file, so you only need to change it in one place.

### 3. Run the frontend

In VS Code:

1. Install the **Live Server** extension.
2. Right-click `index.html` → **Open with Live Server**.

## Usage

1. **Create wallets** — go to the Create Wallet page, generate wallets for the vendor (deployer), buyer, and doorman. Each download is an encrypted V3 keystore JSON.
2. **Fund wallets** with SETH from a Sepolia faucet (e.g. https://sepoliafaucet.com).
3. **Buy a ticket** — go to Buy Ticket, load your keystore + password, then purchase.
4. **Check balance** — go to Check Balance, paste any address (the doorman would do this at the door).
5. **Return ticket** — go to Return Ticket, load wallet, transfer back to vendor.

## Network

- Network: Sepolia testnet
- RPC: `https://ethereum-sepolia-rpc.publicnode.com`
- Block explorer: `https://sepolia.etherscan.io`

// Generates a new Ethereum wallet and lets the user download it as a JSON file.

let currentWallet = null;

document.getElementById("createBtn").addEventListener("click", function() {
    // web3.eth.accounts.create() generates a new keypair locally (no network call)
    const account = web3.eth.accounts.create();
    currentWallet = account;

    document.getElementById("walletAddress").textContent = account.address;
    document.getElementById("walletPrivateKey").textContent = account.privateKey;
    document.getElementById("walletDetails").classList.remove("hidden");
});

document.getElementById("downloadBtn").addEventListener("click", function() {
    if (!currentWallet) return;

    const walletData = {
        address: currentWallet.address,
        privateKey: currentWallet.privateKey,
        network: "Sepolia testnet",
        createdAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(walletData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "wallet-" + currentWallet.address.slice(0, 8) + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
});

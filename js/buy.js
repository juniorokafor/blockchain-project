// Buys ticket tokens by sending a signed payable transaction to the contract.

let cachedPriceWei = null;

// On page load, fetch and display the ticket price + available supply
(async function loadInfo() {
    try {
        const priceWei = await contract.methods.ticketPrice().call();
        const available = await contract.methods.getAvailableTickets().call();
        cachedPriceWei = priceWei;

        document.getElementById("ticketPriceDisplay").textContent =
            web3.utils.fromWei(priceWei, "ether") + " SETH";
        document.getElementById("availableTickets").textContent = available + " TIX";
    } catch (err) {
        document.getElementById("ticketPriceDisplay").textContent = "Error: " + err.message;
    }
})();

document.getElementById("buyBtn").addEventListener("click", async function() {
    const privateKey = document.getElementById("privateKey").value.trim();
    const amount = parseInt(document.getElementById("amount").value, 10);
    const statusEl = document.getElementById("status");
    const successEl = document.getElementById("success");
    const errorEl = document.getElementById("error");

    statusEl.classList.add("hidden");
    successEl.classList.add("hidden");
    errorEl.classList.add("hidden");

    if (!privateKey || !amount || amount < 1) {
        errorEl.textContent = "Please enter a private key and a valid amount.";
        errorEl.classList.remove("hidden");
        return;
    }

    try {
        const wallet = web3.eth.accounts.privateKeyToAccount(privateKey);
        const totalWei = (BigInt(cachedPriceWei) * BigInt(amount)).toString();

        // Build the transaction
        const txData = contract.methods.buyTicket(amount).encodeABI();
        const tx = {
            from: wallet.address,
            to: CONTRACT_ADDRESS,
            value: totalWei,
            gas: 200000,
            data: txData
        };

        statusEl.textContent = "Signing and sending transaction...";
        statusEl.classList.remove("hidden");

        const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        statusEl.classList.add("hidden");
        successEl.innerHTML =
            "Ticket(s) purchased successfully! " +
            '<a class="tx-link" href="https://sepolia.etherscan.io/tx/' +
            receipt.transactionHash + '" target="_blank">View transaction</a>';
        successEl.classList.remove("hidden");
    } catch (err) {
        statusEl.classList.add("hidden");
        errorEl.textContent = "Error: " + err.message;
        errorEl.classList.remove("hidden");
    }
});

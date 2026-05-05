// Fetches the SETH balance and ticket token balance for a given address.

document.getElementById("checkBtn").addEventListener("click", async function() {
    const address = document.getElementById("address").value.trim();
    const errorEl = document.getElementById("error");
    const resultEl = document.getElementById("result");

    errorEl.classList.add("hidden");
    resultEl.classList.add("hidden");

    if (!web3.utils.isAddress(address)) {
        errorEl.textContent = "Invalid Ethereum address.";
        errorEl.classList.remove("hidden");
        return;
    }

    try {
        // Native SETH balance
        const weiBalance = await web3.eth.getBalance(address);
        const ethBalance = web3.utils.fromWei(weiBalance, "ether");

        // Ticket token balance via ERC-20 balanceOf
        const ticketBalance = await contract.methods.balanceOf(address).call();

        document.getElementById("resultAddress").textContent = address;
        document.getElementById("ethBalance").textContent = ethBalance + " SETH";
        document.getElementById("ticketBalance").textContent = ticketBalance + " TIX";
        resultEl.classList.remove("hidden");
    } catch (err) {
        errorEl.textContent = "Error fetching balance: " + err.message;
        errorEl.classList.remove("hidden");
    }
});

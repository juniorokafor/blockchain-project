// ============================================================================
// CONFIG — single source of truth for contract address, ABI, and web3 instance
// Update CONTRACT_ADDRESS here after every redeployment — nowhere else.
// ============================================================================

const CONTRACT_ADDRESS = "0x16E7E596DCcc75C6112b90F5CF7d9640fcb0C66e";

const ABI = [
    { "inputs": [{"internalType":"uint256","name":"initialSupply","type":"uint256"},{"internalType":"uint256","name":"_ticketPrice","type":"uint256"}], "stateMutability":"nonpayable","type":"constructor" },
    { "anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event" },
    { "anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"buyer","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"paid","type":"uint256"}],"name":"TicketPurchased","type":"event" },
    { "anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TicketReturned","type":"event" },
    { "anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event" },
    { "anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"vendor","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event" },
    { "inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function" },
    { "inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function" },
    { "inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function" },
    { "inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"buyTicket","outputs":[],"stateMutability":"payable","type":"function" },
    { "inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function" },
    { "inputs":[],"name":"getAvailableTickets","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function" },
    { "inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function" },
    { "inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"returnTicket","outputs":[],"stateMutability":"nonpayable","type":"function" },
    { "inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function" },
    { "inputs":[],"name":"ticketPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function" },
    { "inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function" },
    { "inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function" },
    { "inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function" },
    { "inputs":[],"name":"vendor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function" },
    { "inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function" }
];

const web3 = new Web3("https://ethereum-sepolia-rpc.publicnode.com");
const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

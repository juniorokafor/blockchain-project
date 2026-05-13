// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract TicketToken is IERC20 {
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 private _totalSupply;
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;

    address public vendor;
    uint256 public ticketPrice; // price per ticket in wei

    // Reentrancy guard — locked during any ETH-transferring call
    bool private _locked;

    modifier nonReentrant() {
        require(!_locked, "Reentrant call");
        _locked = true;
        _;
        _locked = false;
    }

    event TicketPurchased(address indexed buyer, uint256 amount, uint256 paid);
    event TicketReturned(address indexed from, uint256 amount);
    event Withdrawn(address indexed vendor, uint256 amount);

    constructor(uint256 initialSupply, uint256 _ticketPrice) {
        name = "EventTicket";
        symbol = "TIX";
        decimals = 0; // tickets are whole units
        _totalSupply = initialSupply;
        vendor = msg.sender;
        ticketPrice = _ticketPrice;
        _balances[vendor] = _totalSupply;
        emit Transfer(address(0), vendor, _totalSupply);
    }

    function totalSupply() external view override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) external view override returns (uint256) {
        return _balances[account];
    }

    function transfer(address recipient, uint256 amount) external override returns (bool) {
        _transfer(msg.sender, recipient, amount);
        return true;
    }

    function allowance(address owner, address spender) external view override returns (uint256) {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint256 amount) external override returns (bool) {
        _approve(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) external override returns (bool) {
        require(_allowances[sender][msg.sender] >= amount, "Allowance too low");
        _transfer(sender, recipient, amount);
        _approve(sender, msg.sender, _allowances[sender][msg.sender] - amount);
        return true;
    }

    function _transfer(address sender, address recipient, uint256 amount) internal {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
        require(_balances[sender] >= amount, "ERC20: transfer amount exceeds balance");

        _balances[sender] -= amount;
        _balances[recipient] += amount;
        emit Transfer(sender, recipient, amount);
    }

    function _approve(address owner, address spender, uint256 amount) internal {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    // -------- Ticket-specific functions --------

    function buyTicket(uint256 amount) external payable {
        require(amount > 0, "Must buy at least one ticket");
        require(msg.value == ticketPrice * amount, "Send exact ticket price — no overpayments accepted");
        require(_balances[vendor] >= amount, "Not enough tickets available");
        _transfer(vendor, msg.sender, amount);
        emit TicketPurchased(msg.sender, amount, msg.value);
    }

    function returnTicket(uint256 amount) external nonReentrant {
        require(amount > 0, "Must return at least one ticket");
        require(_balances[msg.sender] >= amount, "Not enough tickets to return");
        _transfer(msg.sender, vendor, amount);
        (bool success, ) = payable(msg.sender).call{value: ticketPrice * amount}("");
        require(success, "Refund failed");
        emit TicketReturned(msg.sender, amount);
    }

    function withdraw() external nonReentrant {
        require(msg.sender == vendor, "Only vendor can withdraw");
        uint256 amount = address(this).balance;
        (bool success, ) = payable(vendor).call{value: amount}("");
        require(success, "Withdraw failed");
        emit Withdrawn(vendor, amount);
    }

    function getAvailableTickets() external view returns (uint256) {
        return _balances[vendor];
    }
}
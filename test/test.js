const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ERC721 Soulbound", function () {
  let soulbound;

  beforeEach("Deploy Soulbound NFT example", async function () {
    const SoulboundExample = await ethers.getContractFactory("SBExampleNFT");
    soulbound = await SoulboundExample.deploy("Soulbound", "SB");
    await soulbound.deployed();
  })

  it("Should mint and burn token by owner", async function () {
    const [signer0] = await ethers.getSigners();
    
    const mintTx = await soulbound.mint(signer0.address);
    await mintTx.wait();

    const balance = await soulbound.balanceOf(signer0.address);
    expect(balance).to.equal(1);

    const tokenId = 0;
    const burnTx = await soulbound.burn(tokenId);
    await burnTx.wait();

    const balanceAfterBurn = await soulbound.balanceOf(signer0.address);
    expect(balanceAfterBurn).to.equal(0);
  });

  it("Cannot transfer between non-zero addresses", async function () {
    const [signer0, signer1] = await ethers.getSigners();

    const mintTx = await soulbound.connect(signer0).mint(signer0.address);
    await mintTx.wait();

    let reverted = false;
    try {
      const transferTx = await soulbound.connect(signer0).safeTransferFrom(signer0.address, signer1.address, 0);
      await transferTx.wait();
    } catch (error) {
      reverted = true;
    }

    if (!reverted) return expect.fail()
    
    const signer0Balance = await soulbound.balanceOf(signer0.address);
    const signer1Balance = await soulbound.balanceOf(signer1.address);
    expect(signer0Balance).to.equal(1);
    expect(signer1Balance).to.equal(0);
  })
});

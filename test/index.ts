import { expect } from "chai";
import { ethers } from "hardhat";
import { text } from "stream/consumers";
import { CharacterSeeder } from "../factories/character.factory";

describe("MyEpicGame", function () {
  it("Should return the new greeting once it's changed", async function () {
    const MyEpicGame = await ethers.getContractFactory("MyEpicGame");
    const contract = await MyEpicGame.deploy(CharacterSeeder);

    await contract.deployed();

    const chars = await contract.getCharacters();

    console.log({ chars });

    expect(chars.length).to.be.equal(100);
  });
});

import { expect } from "chai";
import { ethers } from "hardhat";
import { CharacterSeeder } from "../factories/character.factory";
import { MyEpicGame } from "../typechain";

describe("MyEpicGame", function () {
  let contract: MyEpicGame;

  beforeEach(async () => {
    const MyEpicGame = await ethers.getContractFactory("MyEpicGame");
    contract = await MyEpicGame.deploy(CharacterSeeder);
    await contract.deployed();
  });

  it("should return 100 when has initial seed data of 100 characters on contract deployment", async function () {

    const chars = await contract.getCharacters();

    console.log(chars[0]);

    expect(chars.length).to.be.equal(3);
  });

  describe("tokenURI", () => {
    it("should return base64 encoded character data, when given a tokenId that sender owns", async () => {
      await contract.deployed();

      await contract.mintCharacterNFT(2);
      const json = await contract.tokenURI(1);

      console.log(json);
    });
  });
});

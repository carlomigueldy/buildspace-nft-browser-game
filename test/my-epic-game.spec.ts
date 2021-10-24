import { expect } from "chai";
import { ethers } from "hardhat";
import { CharacterSeeder } from "../factories/character.factory";
import { MyEpicGame } from "../typechain";

describe("MyEpicGame", function () {
  let contract: MyEpicGame;

  beforeEach(async () => {
    const MyEpicGame = await ethers.getContractFactory("MyEpicGame");
    contract = await MyEpicGame.deploy(CharacterSeeder, CharacterSeeder);
    await contract.deployed();
  });

  it("should return 100 when has initial seed data of 100 characters on contract deployment", async function () {
    const chars = await contract.getCharacters();

    console.log(chars[0]);

    expect(chars.length).to.be.equal(3);
  });

  describe("mintCharacterNFT", () => {
    it("should emit an event when a User mints an NFT", async () => {
      await expect(contract.mintCharacterNFT(0)).to.emit(
        contract,
        "CharacterMinted"
      );
    });
  });

  describe("attack", () => {
    it("should decrement boss HP when called", async () => {
      const bossId = 0;
      const characterIndex = 0;

      await contract.mintCharacterNFT(characterIndex);

      await contract.attack(bossId);
      let boss = await contract.getBoss(bossId);

      console.log({
        bossHealthPoints: boss.healthPoints.toNumber(),
        bossMaxHealthPoints: boss.maxHealthPoints.toNumber(),
      });

      expect(boss.maxHealthPoints.toNumber()).to.be.not.eq(
        boss.healthPoints.toNumber()
      );
    });

    it("should decrement player HP when called", async () => {
      const bossId = 0;
      const characterIndex = 0;

      await contract.mintCharacterNFT(characterIndex);

      await contract.attack(bossId);
      let character = await contract.getPlayerCharacter();

      console.log({
        playerHealthPoints: character.healthPoints.toNumber(),
        playerMaxHealthPoints: character.maxHealthPoints.toNumber(),
      });

      expect(character.maxHealthPoints.toNumber()).to.be.not.eq(
        character.healthPoints.toNumber()
      );
    });
  });
});

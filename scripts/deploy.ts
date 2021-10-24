import { getAddress } from "@ethersproject/address";
import { BigNumber } from "@ethersproject/bignumber";
import { ethers } from "hardhat";
import { CharacterFactory } from "../factories/character.factory";

async function main() {
  const MyEpicGame = await ethers.getContractFactory("MyEpicGame");
  const contract = await MyEpicGame.deploy(
    CharacterFactory.generateFakeArray(100).map((character) => {
      return {
        armor: BigNumber.from(character.armor),
        attackDamage: BigNumber.from(character.attackDamage),
        class: String(character.class),
        healthPoints: BigNumber.from(character.healthPoints),
        imageURI: character.imageURI,
        index: BigNumber.from(character.index),
        magicDamage: BigNumber.from(character.magicDamage),
        magicResistance: BigNumber.from(character.magicResistance),
        maxHealthPoints: BigNumber.from(character.maxHealthPoints),
        name: character.name,
      };
    })
  );

  await contract.deployed();

  console.log("MyEpicGame deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

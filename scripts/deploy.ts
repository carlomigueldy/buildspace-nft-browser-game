import { ethers } from "hardhat";
import {
  BossSeeder,
  CharacterFactory,
  CharacterSeeder,
} from "../factories/character.factory";

async function main() {
  const MyEpicGame = await ethers.getContractFactory("MyEpicGame");

  const contract = await MyEpicGame.deploy(CharacterSeeder, BossSeeder);

  await contract.deployed();
  console.log("MyEpicGame deployed to:", contract.address);

  let txn;
  txn = await contract.mintCharacterNFT(0);
  await txn.wait();

  txn = await contract.attack(0);
  await txn.wait();

  txn = await contract.attack(0);
  await txn.wait();

  txn = await contract.attack(1);
  await txn.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

import { ethers } from "hardhat";
import { CharacterSeeder } from "../factories/character.factory";

async function main() {
  const MyEpicGame = await ethers.getContractFactory("MyEpicGame");
  const contract = await MyEpicGame.deploy(CharacterSeeder);

  await contract.deployed();

  console.log("MyEpicGame deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

import { ethers } from "hardhat";
import { CharacterSeeder } from "../factories/character.factory";

async function main() {
  const MyEpicGame = await ethers.getContractFactory("MyEpicGame");
  const contract = await MyEpicGame.deploy(CharacterSeeder);

  await contract.deployed();
  console.log("MyEpicGame deployed to:", contract.address);

  // const chars = await contract.getCharacters();
  // console.log(chars[0])

  let txn;
  txn = await contract.mintCharacterNFT(0);
  await txn.wait();

  // txn = await contract.mintCharacterNFT(1);
  // await txn.wait();
  // console.log("Minted NFT #2");

  // txn = await contract.mintCharacterNFT(2);
  // await txn.wait();
  // console.log("Minted NFT #3");

  // txn = await contract.mintCharacterNFT(3);
  // await txn.wait();
  // console.log("Minted NFT #4");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

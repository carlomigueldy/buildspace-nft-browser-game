import { ethers } from "hardhat";

async function main() {
  const MyEpicGame = await ethers.getContractFactory("MyEpicGame");
  const contract = await MyEpicGame.deploy("Hello, Hardhat!");

  await contract.deployed();

  console.log("MyEpicGame deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

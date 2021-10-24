import { ethers } from "hardhat";
import {
  CharacterFactory,
  CharacterSeeder,
} from "../factories/character.factory";

async function main() {
  const MyEpicGame = await ethers.getContractFactory("MyEpicGame");
  const bossHp = {
    healthPoints: 3000,
    maxHealthPoints: 3000,
  };
  const contract = await MyEpicGame.deploy(CharacterSeeder, [
    {
      ...CharacterFactory.generateFake(),
      ...bossHp,
      imageURI:
        "https://wow.zamimg.com/uploads/blog/images/20854-henry-cavill-as-arthas-menethil-by-bosslogic-actor-approves.jpg",
      name: "Arthas",
    },
    {
      ...CharacterFactory.generateFake(),
      ...bossHp,
      imageURI:
        "https://static.wikia.nocookie.net/theworldofblueteam/images/f/f2/Syl.jpg/revision/latest?cb=20180330214606",
      name: "Lady Sylvannas",
    },
    {
      ...CharacterFactory.generateFake(),
      ...bossHp,
      imageURI:
        "https://blizzardwatch.com/wp-content/uploads/2019/12/Jailer-Header.png",
      name: "Jailer",
    },
    ...CharacterSeeder,
  ]);

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

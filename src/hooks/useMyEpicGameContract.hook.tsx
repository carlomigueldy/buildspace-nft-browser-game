import { ethers } from "ethers";
import config from "../constants/index";
import MyEpicGameJSON from "../../artifacts/contracts/MyEpicGame.sol/MyEpicGame.json";
import { MyEpicGame } from "../../typechain";

export default function useMyEpicGameContract(): MyEpicGame {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    config.CONTRACT_ADDRESS,
    MyEpicGameJSON.abi,
    signer
  ) as MyEpicGame;

  return contract;
}

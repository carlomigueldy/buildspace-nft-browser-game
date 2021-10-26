import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Center, Text } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { Character } from "../../types";
import useMyEpicGameContract from "../hooks/useMyEpicGameContract.hook";
import { transformCharacterData } from "../utils";

export default function Arena() {
  const contract = useMyEpicGameContract();
  const [boss, setBoss] = useState<Character | null>(null);
  const [character, setCharacter] = useState<Character | null>(null);

  const fetchBoss = async () => {
    const boss = await contract.getBoss(0);
    setBoss(transformCharacterData(boss));
  };

  async function fetchCharacter() {
    const character = await contract.getPlayerCharacter();
    setCharacter(transformCharacterData(character));
  }

  async function attack() {
    const tx = await contract.attack(0);
    await tx.wait();
  }

  useEffect(() => {
    fetchBoss();
    fetchCharacter();
  }, []);

  return (
    <Box bgColor="blue.900" color="white" height="100vh" width="100%" p={10}>
      <Center>
        <Text fontSize="4xl">Arena</Text>
      </Center>

      <Box display="flex" justifyContent="center" alignItems="center">
        <Box m={5}>
          <Image
            src={character?.imageURI}
            borderRadius="md"
            height="350px"
            width="250px"
          />
          <Text>You</Text>
          <Text>Attack Damage: {character?.attackDamage}</Text>
          <Text>
            HP: {character?.healthPoints}/{character?.maxHealthPoints}
          </Text>
        </Box>

        <Box m={5}>
          <Image
            src={boss?.imageURI}
            borderRadius="md"
            height="350px"
            width="250px"
          />
          <Text>{boss?.name}</Text>
          <Text>Attack Damage: {boss?.attackDamage}</Text>
          <Text>
            HP: {boss?.healthPoints}/{boss?.maxHealthPoints}
          </Text>
        </Box>
      </Box>

      <Button onClick={attack}>Attack</Button>
    </Box>
  );
}

import React, { useContext, useEffect, useState } from "react";
import { Box, Divider, Text } from "@chakra-ui/layout";
import { Stack } from "@chakra-ui/react";
import useMyEpicGameContract from "../hooks/useMyEpicGameContract.hook";
import { GlobalContext } from "../state/global";
import { Character } from "../../types";
import { transformCharacterData } from "../utils";

export default function CharacterSelectionPage() {
  const contract = useMyEpicGameContract();
  const [character, setCharacter] = useState<Character | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const globalState = useContext(GlobalContext);

  const fetchNFTMetadata = async () => {
    console.log("Checking for Character NFT on address:", globalState.account);

    const character = await contract.checkIfPlayerHasCharacter();

    if (character.name) {
      console.log("User has character NFT", { character });
      globalState.character = transformCharacterData(character);
      setCharacter(globalState.character);
    }
  };

  async function fetchCharacters() {
    const characters = await contract.getCharacters();

    console.log({ characters });

    setCharacters(
      characters.map((character) => transformCharacterData(character))
    );
  }

  async function selectCharacter() {
    // contract.mintCharacterNFT()
  }

  useEffect(() => {
    fetchNFTMetadata();
    fetchCharacters();
  }, [globalState.account]);

  return (
    <Box bgColor="blue.900" display="flex" height="100%" p={10}>
      <Stack>
        <Text color="white" fontWeight="bold" fontSize="4xl">
          Select Character 👉
        </Text>
        <Text color="orange">
          ⚠️ You will never be able to reselect your character.
        </Text>

        <Box justifyContent="center" alignItems="center" display="flex">
          <Box width="100%" height="0" paddingBottom="100%" position="relative">
            <iframe
              src="https://giphy.com/embed/QJJLEztnLYmAfIkCUI"
              width="100%"
              height="100%"
              style={{
                position: "absolute",
              }}
              frameBorder="0"
              className="giphy-embed"
              allowFullScreen
            ></iframe>
          </Box>

          <Box width="100%" height="0" paddingBottom="100%" position="relative">
            <iframe
              src="https://giphy.com/embed/2UpMjkgq1lZdVVnTAv"
              width="100%"
              height="100%"
              style={{
                position: "absolute",
              }}
              frameBorder="0"
              className="giphy-embed"
              allowFullScreen
            ></iframe>
          </Box>
        </Box>

        <Text color="white">We are not an NFT but I am a dancing Boomkins</Text>

        <Divider />
      </Stack>

      <Box
        p={5}
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        {characters.map((character, index) => {
          return (
            <Box
              bgImage={character.imageURI}
              bgColor="red"
              height="250px"
              width="250px"
              borderRadius="sm"
              m={5}
              key={index}
              onClick={() => selectCharacter(character)}
            >
              <Text fontSize="4xl" color="black">
                {character.name}
              </Text>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

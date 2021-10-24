import React from "react";
import { Box, Divider, Text } from "@chakra-ui/layout";
import { Stack } from "@chakra-ui/react";
import useMyEpicGameContract from "../hooks/useMyEpicGameContract.hook";

export default function CharacterSelectionPage() {
  const contract = useMyEpicGameContract();

  return (
    <Box bgColor="blue.900" display="flex" height="100vh" p={10}>
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
    </Box>
  );
}

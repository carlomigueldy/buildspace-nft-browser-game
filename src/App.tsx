import { Box, Center, Text } from "@chakra-ui/layout";
import { useState } from "react";
import "./App.css";

function App() {
  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Center>
        <Box>
          <Text fontSize="4xl">Ethereum's Awesome NFT Game</Text>
          <p>Test</p>
        </Box>
      </Center>
    </Box>
  );
}

export default App;

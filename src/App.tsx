import { Box, Center, Link, Spacer, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have MetaMask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);

        /*
         * Check if we're authorized to access the user's wallet
         */
        const accounts = await ethereum.request({ method: "eth_accounts" });

        /*
         * User can have multiple authorized accounts, we grab the first one if its there!
         */
        if (accounts.length !== 0) {
          const [account] = accounts;
          console.log("Found an authorized account:", account);
          setCurrentAccount(account);
        } else {
          console.log("No authorized account found");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <>
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bgColor="transparent"
        backdropFilter="blur(12px)"
        height="60px"
        px={2}
        display="flex"
        alignItems="center"
      >
        <Spacer />

        <Button borderRadius="none">Connect Wallet</Button>
      </Box>

      <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgColor="blue.900"
      >
        <Center>
          <Box>
            <Box my={5}>
              <Text fontSize="4xl" fontWeight="bold" color="blue.50">
                Ethereum's Awesome NFT Game
              </Text>
              <Text color="blue.200">Team up to protect Azerotheum</Text>
            </Box>

            <Button
              borderRadius="none"
              size="lg"
              bgColor="blue.400"
              color="white"
              _hover={{
                bgColor: "blue.500",
              }}
            >
              Play ⚔️
            </Button>
          </Box>
        </Center>
      </Box>

      <Box
        color="white"
        p={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="fixed"
        bottom={0}
        left={0}
        right={0}
      >
        Made with 💖 by{" "}
        <Link ml="2" href="https://twitter.com/CarloMiguelDy" target="_blank">
          carlomigueldy.eth
        </Link>
      </Box>
    </>
  );
}

export default App;

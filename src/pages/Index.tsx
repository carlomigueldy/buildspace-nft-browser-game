import { Box, Center, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import AppContainer from "../components/AppContainer";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { GlobalContext } from "../state/global";

function IndexPage() {
  const history = useHistory();
  const [currentAccount, setCurrentAccount] = useState(null);
  const globalContext = useContext(GlobalContext);
  const { ethereum } = window;

  const checkIfWalletIsConnected = async () => {
    try {
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
          globalContext.account = account;
          setCurrentAccount(account);
        } else {
          console.log("No authorized account found");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function connectWallet() {
    const [account] = await ethereum.request({
      method: "eth_requestAccounts",
    });

    if (!account) {
      return;
    }

    return setCurrentAccount(account);
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <>
      <AppContainer>
        <NavBar onClickConnectWallet={connectWallet} />

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
              onClick={() => history.push("/character-selection")}
            >
              Play ⚔️
            </Button>
          </Box>
        </Center>

        <Footer />
      </AppContainer>
    </>
  );
}

export default IndexPage;

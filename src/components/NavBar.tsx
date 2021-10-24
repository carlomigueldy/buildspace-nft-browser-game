import { Button } from "@chakra-ui/button";
import { Box, Spacer, Text } from "@chakra-ui/layout";
import React from "react";
import { GlobalContext } from "../state/global";

export type NavBarProps = {
  children?: React.ReactNode;
  onClickConnectWallet?: () => void;
};

export default function NavBar({
  children,
  onClickConnectWallet,
}: NavBarProps) {
  return (
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
      <GlobalContext.Consumer>
        {(value) => <Text>{value.account}</Text>}
      </GlobalContext.Consumer>

      <Spacer />

      <Button onClick={onClickConnectWallet} borderRadius="none">
        Connect Wallet
      </Button>
    </Box>
  );
}

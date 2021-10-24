import React from "react";
import { Box } from "@chakra-ui/layout";
import { Link } from "@chakra-ui/react";

export default function Footer() {
  return (
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
  );
}

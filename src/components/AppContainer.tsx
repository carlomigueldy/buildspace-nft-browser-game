import React from "react";
import { Box } from "@chakra-ui/layout";

export type AppContainerProps = {
  children?: React.ReactNode;
};

export default function AppContainer({ children }: AppContainerProps) {
  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgColor="blue.900"
    >
      {children}
    </Box>
  );
}

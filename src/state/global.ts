import React from "react";

export type GlobalState = {
  account?: string;
};

export const GlobalContext = React.createContext<GlobalState>({});

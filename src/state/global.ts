import React from "react";
import { Character } from "../../types";

export type GlobalState = {
  account?: string;
  character?: Character;
};

export const GlobalContext = React.createContext<GlobalState>({});

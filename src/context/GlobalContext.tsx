"use client";

import { Playlist } from "@/types/playlist";
import { Session } from "next-auth";
import { createContext, useContext } from "react";

type GlobalContextProps = {
  children: React.ReactNode;
};

type GlobalContextType = {
  session: Session | null;
  likedSongs: string[];
  playlists: Playlist;
};

const GlobalContext = createContext<GlobalContextType>({
  session: null,
  likedSongs: [],
  playlists: [],
});

export const GlobalContextProvider = ({
  children,
  ...contextValues
}: GlobalContextProps & GlobalContextType) => {
  return (
    <GlobalContext.Provider value={contextValues}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const data = useContext(GlobalContext);

  return data;
};

export default GlobalContextProvider;

"use client";
import { createContext, useContext, useState } from "react";

const MusicContext = createContext<{
  currentID: string | null;
  setCurrentID: (id: string | null) => void;
}>({
  currentID: null,
  setCurrentID: () => {},
});

export const MusicProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentID, setCurrentID] = useState<string | null>(null);
  return (
    <MusicContext.Provider value={{ currentID, setCurrentID }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);

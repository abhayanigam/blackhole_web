"use client";
import { NextContext } from "@/hooks/use-context";
import { useState } from "react";

export default function NextProvider({ children }) {
  const [nextData, setNextData] = useState(null);
  const [songs, setSongs] = useState([]);

  return (
    <NextContext.Provider value={{ nextData, setNextData, songs, setSongs }}>
      {children}
    </NextContext.Provider>
  );
}

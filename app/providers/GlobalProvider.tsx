"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface GlobalContextProps {
  portfolios: any[];
  isLoading: boolean;
  isAppReady: boolean;
  setIsAppReady: React.Dispatch<React.SetStateAction<boolean>>;
}

const GlobalContext = createContext<GlobalContextProps>({
  portfolios: [],
  isLoading: true,
  isAppReady: false,
  setIsAppReady: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAppReady, setIsAppReady] = useState(false);
  const pathname = usePathname();

  // If loading finishes and we're not on the home page, immediately set app ready
  useEffect(() => {
    if (!isLoading && pathname !== "/") {
      setIsAppReady(true);
    }
  }, [isLoading, pathname]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/portfolios");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        const sorted = [...data].sort((a: any, b: any) => {
          const aFeatured = a.tags?.some((t: any) => t.tag.label.toLowerCase() === "featured") || false;
          const bFeatured = b.tags?.some((t: any) => t.tag.label.toLowerCase() === "featured") || false;
          if (aFeatured && !bFeatured) return -1;
          if (!aFeatured && bFeatured) return 1;
          return 0;
        });

        setPortfolios(sorted);
      } catch (err) {
        console.error("Failed to fetch portfolios from global provider", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <GlobalContext.Provider value={{ portfolios, isLoading, isAppReady, setIsAppReady }}>
      {children}
    </GlobalContext.Provider>
  );
};

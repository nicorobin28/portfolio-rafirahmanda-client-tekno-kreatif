"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import InitialLoader from "@/components/InitialLoader";
import { AnimatePresence, motion } from "framer-motion";

interface GlobalContextProps {
  portfolios: any[];
  isLoading: boolean;
}

const GlobalContext = createContext<GlobalContextProps>({
  portfolios: [],
  isLoading: true,
});

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);   // controls AnimatePresence mount
  const [loaderDone, setLoaderDone] = useState(false);  // controls content fade-in

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

  /**
   * Called by InitialLoader once all MorphText animations have completed.
   * Step 1: trigger content fade-in immediately
   * Step 2: unmount the loader from DOM after its exit animation (700ms) finishes
   */
  const handleLoaderComplete = () => {
    setLoaderDone(true);      // start fading in content
    setShowLoader(false);     // trigger AnimatePresence exit animation on loader
    // Loader's exit animation is 0.7s; it will cleanly unmount via AnimatePresence
  };

  return (
    <GlobalContext.Provider value={{ portfolios, isLoading }}>
      {/* Loader overlays everything — AnimatePresence handles its exit */}
      <AnimatePresence>
        {showLoader && (
          <InitialLoader
            key="initial-loader"
            isLoadingData={isLoading}
            onComplete={handleLoaderComplete}
          />
        )}
      </AnimatePresence>

      {/* Page content — fades in as loader exits */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaderDone ? 1 : 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
      >
        {children}
      </motion.div>
    </GlobalContext.Provider>
  );
};

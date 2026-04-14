"use client";

import React, { useState, useEffect, useRef } from "react";
import Card from "@/app/component/card";
import Link from "next/link";
import { useGlobalContext } from "../providers/GlobalProvider";
import { motion } from "framer-motion";
import MorphText from "@/components/MorphText";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Fade secara berurut pada sisi card
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Page() {
  const { portfolios, isLoading, isAppReady, setIsAppReady } =
    useGlobalContext();

  // Determine if this is the very first time we load the page before app is ready
  const isFirstLoad = useRef(!isAppReady);

  const [dataReady, setDataReady] = useState(isAppReady ? true : false);
  const [nameSettled, setNameSettled] = useState(isAppReady ? true : false);
  const [locationSettled, setLocationSettled] = useState(
    isAppReady ? true : false,
  );
  const [roleStarted, setRoleStarted] = useState(isAppReady ? true : false);
  const [roleSettled, setRoleSettled] = useState(isAppReady ? true : false);

  const [welcomePhase, setWelcomePhase] = useState(isAppReady ? 1 : 0);
  const [portfolioPhase, setPortfolioPhase] = useState(isAppReady ? 1 : 0);

  useEffect(() => {
    if (!isLoading) {
      setDataReady(true);
    }
  }, [isLoading]);
  useEffect(() => {
    if (isFirstLoad.current) {
      if (dataReady && nameSettled && locationSettled) {
        const t = setTimeout(() => setRoleStarted(true), 200);
        return () => clearTimeout(t);
      }
    }
  }, [dataReady, nameSettled, locationSettled]);

  useEffect(() => {
    if (isFirstLoad.current) {
      if (roleSettled && !isAppReady) {
        const t = setTimeout(() => setIsAppReady(true), 300);
        return () => clearTimeout(t);
      }
    }
  }, [roleSettled, isAppReady, setIsAppReady]);

  return (
    <div className="pb-10">
      {/* HEADER SECTION (Tampil tanpa delay, menjalankan animasi MorphText jika isFirstLoad) */}
      <div className="w-full flex flex-col md:flex-row pt-[64px] pb-[64px] px-[20px] md:px-[120px] gap-[24px]">
        <div className="flex justify-between w-full items-start">
          <p className="text-[40px] md:text-[62px] font-medium font-jakarta text-[#171718]">
            {isFirstLoad.current ? (
              welcomePhase === 0 ? (
                <MorphText
                  key="welcome-phase-0"
                  from=""
                  to="Welcome"
                  trigger={true}
                  animateInitial={true}
                  onComplete={() => {
                    setTimeout(() => setWelcomePhase(1), 400);
                  }}
                  tickMs={28}
                  stagger={38}
                  spinCount={8}
                />
              ) : (
                <MorphText
                  key="welcome-phase-1"
                  from="Welcome"
                  to="Rafi Rahmanda"
                  trigger={true}
                  animateInitial={true}
                  isLooping={!dataReady}
                  onComplete={() => setNameSettled(true)}
                  tickMs={28}
                  stagger={38}
                  spinCount={8}
                />
              )
            ) : (
              "Rafi Rahmanda"
            )}
          </p>
        </div>

        <div className="flex justify-between items-end h-auto md:h-[77px] font-roboto">
          <p className="text-[#171718] text-[12px] md:text-[16px] w-auto md:w-[270px] md:pl-9 font-roboto">
            {isFirstLoad.current ? (
              roleStarted ? (
                <MorphText
                  from="Role"
                  to="UI/UX DESIGNER"
                  trigger={true}
                  animateInitial={true}
                  onComplete={() => setRoleSettled(true)}
                  tickMs={22}
                  stagger={30}
                  spinCount={6}
                />
              ) : (
                <span className="opacity-0">Role</span>
              )
            ) : (
              "UI/UX DESIGNER"
            )}
          </p>
          <p className="text-[#171718] text-[12px] md:text-[16px] w-auto md:w-[270px] font-roboto bg-transparent">
            {isFirstLoad.current ? (
              portfolioPhase === 0 ? (
                <MorphText
                  key="portfolio-phase-0"
                  from=""
                  to="Portfolio 2025"
                  trigger={true}
                  animateInitial={true}
                  onComplete={() => {
                    setTimeout(() => setPortfolioPhase(1), 400);
                  }}
                  tickMs={22}
                  stagger={30}
                  spinCount={6}
                />
              ) : (
                <MorphText
                  key="portfolio-phase-1"
                  from="Portfolio 2025"
                  to="PHNOM PENH, KH"
                  trigger={true}
                  animateInitial={true}
                  isLooping={!dataReady}
                  onComplete={() => setLocationSettled(true)}
                  tickMs={22}
                  stagger={30}
                  spinCount={6}
                />
              )
            ) : (
              "PHNOM PENH, KH"
            )}
          </p>
        </div>
      </div>

      {/* PORTFOLIOS SECTION (Hanya tampil and fade in ketika isAppReady true) */}
      {isAppReady && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="px-4 md:px-[120px]"
        >
          <main className="grid grid-cols-1 md:grid-cols-4 gap-[48px] md:gap-x-6 md:gap-y-12 justify-center">
            {portfolios.map((portfolio: any) => (
              <motion.div key={portfolio.id} variants={itemVariants}>
                <Link href={`/work-detail/${portfolio.id}`}>
                  <Card
                    img={portfolio.images?.[0]?.url || "/home1.png"}
                    desc={{
                      icon: (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="16" height="16" rx="2" fill="#E5E7EB" />
                          <path d="M4 4h8v8H4V4z" fill="#9CA3AF" />
                        </svg>
                      ),
                      name: portfolio.company,
                      year: portfolio.year.toString(),
                    }}
                    title={portfolio.title}
                    subtitle={portfolio.subTitle}
                    companyLogoUrl={portfolio.companyLogoUrl || null}
                    isFeatured={portfolio.tags?.some(
                      (t: any) =>
                        t.tag?.label === "Featured" ||
                        t.label === "Featured" ||
                        t.name === "Featured",
                    )}
                  />
                </Link>
              </motion.div>
            ))}
          </main>

          {portfolios.length === 0 && (
            <motion.div
              variants={itemVariants}
              className="text-center py-20 text-gray-400 font-jakarta"
            >
              No projects available yet.
            </motion.div>
          )}

          {portfolios.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="md:hidden text-center mt-[48px]"
            >
              <p className="text-[#5B5E61] font-jakarta pb-5 text-[14px]">
                That’s all for now!
              </p>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}

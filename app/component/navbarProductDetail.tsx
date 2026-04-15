"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MorphText from "@/components/MorphText";
import { useGlobalContext } from "../providers/GlobalProvider";

const navbarProductDetail = () => {
  const menuDesktop: { id: number; name: string; path: string }[] = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "About",
      path: "/about",
    },
  ];

  const pathname = usePathname();
  const currentId = pathname.match(/\/work-detail\/([^/]+)/)?.[1];

  const [isOpen, setIsOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { portfolios } = useGlobalContext();

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100] h-[56px] md:h-[64px]">
        {/* LAYER 0: Bottom Static Background Bar (Desktop & Mobile) */}
        <div className="absolute inset-0 z-0 bg-white/75 backdrop-blur-xl" />

        {/* LAYER 3: Top Interactive Layer (Buttons) - Highest Z so they stay on top of sidebar */}
        <div className="absolute inset-0 z-30 flex justify-between items-center w-full h-full px-[16px] md:px-12 lg:px-[120px]">
          {/* Button Toggle Sidebar */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-3 cursor-pointer h-[40px]"
          >
            <div className="relative w-[20px] h-[20px] flex flex-col justify-center items-center">
              <motion.span
                className="absolute block h-[1.5px] bg-black rounded-full"
                animate={
                  isOpen
                    ? { translateY: 0, rotate: 45 }
                    : { translateY: -6, rotate: 0 }
                }
                style={{ width: 20 }}
              />
              <motion.span
                className="absolute block h-[1.5px] bg-black rounded-full"
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                style={{ width: 20 }}
              />
              <motion.span
                className="absolute block h-[1.5px] bg-black rounded-full"
                animate={
                  isOpen
                    ? { translateY: 0, rotate: -45 }
                    : { translateY: 6, rotate: 0 }
                }
                style={{ width: 20 }}
              />
            </div>

            <motion.h1
              layout
              key={isOpen ? "close" : "other"}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[16px] text-black font-roboto-mono font-medium min-w-[120px] text-left"
            >
              {isOpen ? "Close Sidebar" : "Other Works"}
            </motion.h1>
          </button>

          {/* Right Nav Items */}
          <div className="flex items-center gap-6 md:gap-18 lg:gap-24">
            <div className="hidden md:flex gap-18 lg:gap-24">
              {menuDesktop.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link href={item.path} key={item.id}>
                    <button className="flex justify-end w-[172px] text-[16px] font-medium text-black cursor-pointer">
                      {isActive ? (
                        <span className="flex gap-[8px]">
                          <span className="text-blue-500">[</span>
                          {item.name}
                          <span className="text-blue-500">]</span>
                        </span>
                      ) : (
                        item.name
                      )}
                    </button>
                  </Link>
                );
              })}
            </div>
            <Link href="/" className="md:hidden">
              <button className="text-[16px] text-black font-roboto-mono cursor-pointer">
                Home
              </button>
            </Link>
          </div>
        </div>

        {/* LAYER 1: The Sidebar (Sliding Glass over the Background Bar but under the Buttons) */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 z-10"
              />

              {/* Sidebar — geser kiri ke kanan */}
              <motion.div
                key="sidebar"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="absolute z-20 top-0 left-0 h-screen w-full md:w-auto
                      bg-white/24 backdrop-blur-xl
                      border-r border-[#C7C8C9] overflow-hidden"
              >
                <div className="h-full overflow-y-auto no-scrollbar md:w-[calc(33.333vw_+_24px)] w-full pt-[56px] md:pt-[64px]">
                  {/* Product List ... */}

                  {/* Card list — stagger dari kiri */}
                  <motion.div
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    variants={{
                      hidden: { opacity: 0 },
                      show: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.07,
                          delayChildren: 0.35,
                        },
                      },
                    }}
                    className="text-black w-full pt-4"
                  >
                    {portfolios
                      .filter((p: any) => p.id !== currentId)
                      .map((item) => (
                        <motion.div
                          key={item.id}
                          variants={{
                            hidden: { opacity: 0, x: -20, filter: "blur(4px)" },
                            show: {
                              opacity: 1,
                              x: 0,
                              filter: "blur(0px)",
                              transition: { duration: 0.35, ease: "easeOut" },
                            },
                          }}
                          className="px-4 py-5 w-full"
                          onMouseEnter={() => setHoveredId(item.id)}
                          onMouseLeave={() => setHoveredId(null)}
                        >
                          <Link
                            href={`/work-detail/${item.id}`}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center w-full gap-[16px] cursor-pointer group"
                          >
                            {item.images?.[0]?.url ? (
                              <img
                                src={item.images[0].url}
                                alt={item.title}
                                className="w-[90px] h-[60px] flex-shrink-0 object-cover rounded-[6px] bg-[#EFEFF0] border border-[#EFEFF0]"
                              />
                            ) : (
                              <div className="w-[90px] h-[60px] flex-shrink-0 rounded-[6px] bg-[#EFEFF0]" />
                            )}
                            <div className="flex flex-col h-full gap-[4px] min-w-0">
                              <h1 className="font-jakarta font-semibold text-[20px] w-full text-left truncate underline decoration-transparent group-hover:decoration-inherit transition-colors duration-300 underline-offset-4">
                                {item.title}
                              </h1>
                              <div className="flex items-center font-roboto-mono text-[14px] gap-2">
                                <span
                                  className={`transition-all duration-300 flex items-center shrink-0 ${hoveredId === item.id ? "opacity-0 w-0 overflow-hidden" : "opacity-100 gap-1.5"}`}
                                >
                                  {item.companyLogoUrl ? (
                                    <img
                                      src={item.companyLogoUrl}
                                      alt={item.name}
                                      className="w-[16px] h-[16px] object-contain rounded-sm"
                                    />
                                  ) : (
                                    item.icon
                                  )}
                                </span>
                                <h1
                                  className={`flex items-center gap-[2px] transition-colors duration-300 min-w-0 truncate ${hoveredId === item.id ? "text-black font-semibold" : "text-[#5B5E61]"}`}
                                >
                                  <MorphText
                                    from={`${item.company || item.role} • ${item.year}`}
                                    to="Read More"
                                    trigger={hoveredId === item.id}
                                    tickMs={15}
                                    stagger={20}
                                    spinCount={4}
                                  />
                                  <span
                                    className={`transition-all duration-300 shrink-0 ${hoveredId === item.id ? "opacity-100 translate-x-0 ml-1" : "opacity-0 -translate-x-4 max-w-0 overflow-hidden"}`}
                                  >
                                    <svg
                                      width="11"
                                      height="11"
                                      viewBox="0 0 11 11"
                                      fill="none"
                                      className="shrink-0"
                                    >
                                      <path
                                        d="M0.146447 9.81404L8.9606 0.999893H3.33228C3.05614 0.999893 2.83234 0.776089 2.83234 0.499947C2.83234 0.223805 3.05614 2.95028e-07 3.33228 4.21469e-08L10.1676 0L10.2657 0.00966747C10.3618 0.028886 10.4509 0.0760812 10.5212 0.146393C10.615 0.240161 10.6676 0.367338 10.6676 0.499947V7.33531C10.6676 7.61145 10.4438 7.83526 10.1676 7.83526C9.89151 7.83526 9.6677 7.61145 9.6677 7.33531V1.707L0.853553 10.5211C0.658291 10.7164 0.341709 10.7164 0.146447 10.5211C-0.0488155 10.3259 -0.0488155 10.0093 0.146447 9.81404Z"
                                        fill="currentColor"
                                      />
                                    </svg>
                                  </span>
                                </h1>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Spacer to push content down and prevent overlap with fixed navbar */}
      <div className="w-full h-[56px] md:h-[64px] shrink-0" />
    </>
  );
};

export default navbarProductDetail;

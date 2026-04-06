"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MorphText from "@/components/MorphText";
import axios from "axios";

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
  const [portfolios, setPortfolios] = useState<any[]>([]);

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const { data } = await axios.get("/api/portfolios");
      setPortfolios(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    // Navbar md-lg
    <div>
      <div
        className="hidden md:flex justify-between items-center w-full h-[64px] md:px-12 lg:px-[120px] 
                bg-white/75 backdrop-blur-2xl font-roboto-mono"
      >
        {/* ButtonSideBar */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 cursor-pointer h-[40px]"
        >
          <div className="relative w-[20px] h-[20px] flex flex-col justify-center items-center">
            {/* Top line — geser ke tengah dulu, baru rotate 45 */}
            <motion.span
              className="absolute block h-[1.5px] bg-black rounded-full"
              animate={
                isOpen
                  ? { translateY: 0, rotate: 45 }
                  : { translateY: -6, rotate: 0 }
              }
              transition={
                isOpen
                  ? {
                      translateY: { duration: 0.2, ease: "easeInOut" },
                      rotate: { duration: 0.2, ease: "easeInOut", delay: 0.2 },
                    }
                  : {
                      rotate: { duration: 0.2, ease: "easeInOut" },
                      translateY: {
                        duration: 0.2,
                        ease: "easeInOut",
                        delay: 0.2,
                      },
                    }
              }
              style={{ width: 20 }}
            />

            {/* Middle line — geser ke tengah (sudah di tengah), lalu rotate -45 */}
            <motion.span
              className="absolute block h-[1.5px] bg-black rounded-full"
              animate={
                isOpen
                  ? { translateY: 0, rotate: -45, opacity: 1 }
                  : { translateY: 0, rotate: 0, opacity: 1 }
              }
              transition={
                isOpen
                  ? {
                      rotate: { duration: 0.2, ease: "easeInOut", delay: 0.2 },
                    }
                  : {
                      rotate: { duration: 0.2, ease: "easeInOut" },
                    }
              }
              style={{ width: 20 }}
            />

            {/* Bottom line — geser ke tengah dulu, lalu hilang */}
            <motion.span
              className="absolute block h-[1.5px] bg-black rounded-full"
              animate={
                isOpen
                  ? { translateY: 0, opacity: 0 }
                  : { translateY: 6, opacity: 1 }
              }
              transition={
                isOpen
                  ? {
                      translateY: { duration: 0.2, ease: "easeInOut" },
                      opacity: { duration: 0.1, delay: 0.2 },
                    }
                  : {
                      opacity: { duration: 0.1 },
                      translateY: {
                        duration: 0.2,
                        ease: "easeInOut",
                        delay: 0.1,
                      },
                    }
              }
              style={{ width: 20 }}
            />
          </div>

          <h1 className="text-[16px] text-black font-roboto-mono font-medium">
            Other Works
          </h1>
        </button>
        <div className="flex md:gap-18 lg:gap-24">
          {menuDesktop.map((item) => {
            const isActive = pathname === item.path;

            return (
              <Link href={item.path} key={item.id}>
                <button
                  className={`flex justify-end w-[172px] text-[16px] font-medium text-black`}
                >
                  {isActive ? (
                    <span className="flex gap-[8px]">
                      <span className="text-blue-500 pr">[</span>
                      {item.name}
                      <span className="text-blue-500">]</span>
                    </span>
                  ) : (
                    <h1 className="cursor-pointer">{item.name}</h1>
                  )}
                </button>
              </Link>
            );
          })}
          <button className="flex justify-end w-[172px] text-[16px]">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer"
            >
              <path
                d="M10.7451 19.25C10.7451 19.6642 10.4093 20 9.99512 20C9.5809 20 9.24512 19.6642 9.24512 19.25V17.25C9.24512 16.8358 9.5809 16.5 9.99512 16.5C10.4093 16.5 10.7451 16.8358 10.7451 17.25V19.25Z"
                fill="black"
              />
              <path
                d="M5.40039 14.5928C5.69325 14.8856 5.69325 15.3605 5.40039 15.6533L3.98633 17.0674C3.69347 17.3602 3.21864 17.3602 2.92578 17.0674C2.63292 16.7745 2.63292 16.2997 2.92578 16.0068L4.33984 14.5928C4.63271 14.2999 5.10753 14.2999 5.40039 14.5928Z"
                fill="black"
              />
              <path
                d="M17.0746 16.0064C17.3677 16.2994 17.3676 16.7747 17.0744 17.0677C16.7814 17.3604 16.3066 17.3603 16.0137 17.0674L14.5997 15.6534C14.3068 15.3605 14.3068 14.8856 14.5997 14.5927C14.8925 14.2999 15.3673 14.2998 15.6602 14.5926L17.0746 16.0064Z"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.99512 5C12.7565 5 14.9951 7.23858 14.9951 10C14.9951 12.7614 12.7565 15 9.99512 15C7.23369 15 4.99512 12.7614 4.99512 10C4.99512 7.23858 7.23369 5 9.99512 5ZM9.99512 6.5C8.06212 6.5 6.49512 8.067 6.49512 10C6.49512 11.933 8.06212 13.5 9.99512 13.5C11.9281 13.5 13.4951 11.933 13.4951 10C13.4951 8.067 11.9281 6.5 9.99512 6.5Z"
                fill="black"
              />
              <path
                d="M3.5 9.99512C3.5 10.4093 3.16421 10.7451 2.75 10.7451H0.75C0.335787 10.7451 0 10.4093 0 9.99512C0 9.5809 0.335786 9.24512 0.75 9.24512H2.75C3.16421 9.24512 3.5 9.5809 3.5 9.99512Z"
                fill="black"
              />
              <path
                d="M20 9.99512C20 10.4093 19.6642 10.7451 19.25 10.7451H17.25C16.8358 10.7451 16.5 10.4093 16.5 9.99512C16.5 9.5809 16.8358 9.24512 17.25 9.24512H19.25C19.6642 9.24512 20 9.5809 20 9.99512Z"
                fill="black"
              />
              <path
                d="M5.40723 4.33984C5.70009 4.63271 5.70009 5.10753 5.40723 5.40039C5.11436 5.69325 4.63954 5.69325 4.34668 5.40039L2.93262 3.98633C2.63976 3.69347 2.63976 3.21864 2.93262 2.92578C3.22548 2.63292 3.7003 2.63292 3.99316 2.92578L5.40723 4.33984Z"
                fill="black"
              />
              <path
                d="M17.0674 2.92578C17.3602 3.21864 17.3602 3.69347 17.0674 3.98633L15.6533 5.40039C15.3605 5.69325 14.8856 5.69325 14.5928 5.40039C14.2999 5.10753 14.2999 4.63271 14.5928 4.33984L16.0068 2.92578C16.2997 2.63292 16.7745 2.63292 17.0674 2.92578Z"
                fill="black"
              />
              <path
                d="M10.7451 2.75C10.7451 3.16421 10.4093 3.5 9.99512 3.5C9.5809 3.5 9.24512 3.16421 9.24512 2.75V0.75C9.24512 0.335787 9.5809 0 9.99512 0C10.4093 0 10.7451 0.335786 10.7451 0.75V2.75Z"
                fill="black"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Sidebar — Animasi Hordeng Horizontal */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Overlay backdrop */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[2px]"
            />

            {/* Sidebar — geser kiri ke kanan */}
            <motion.div
              key="sidebar"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={{
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="fixed z-50 top-0 left-0 h-screen w-full md:w-auto
                      bg-white/90 backdrop-blur-[24px]
                      border-r border-[#C7C8C9] overflow-hidden"
            >
              {/* Inner scroll container */}
              <div className="h-full overflow-y-auto no-scrollbar md:w-109 w-full">
                {/* Close button */}
                <motion.button
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.3, delay: 0.3, ease: "easeOut" }}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center md:justify-center gap-3 cursor-pointer h-16 w-full px-4 md:px-0 sticky top-0 bg-white/80 backdrop-blur-md border-b border-[#EFEFF0] z-10"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M12.2664 0.183058C12.5105 -0.0610194 12.9061 -0.0610194 13.1502 0.183058C13.3943 0.427136 13.3943 0.82277 13.1502 1.06685L7.55041 6.66662L13.1502 12.2664C13.3943 12.5105 13.3943 12.9061 13.1502 13.1502C12.9061 13.3943 12.5105 13.3943 12.2664 13.1502L6.66662 7.55041L1.06685 13.1502C0.82277 13.3943 0.427136 13.3943 0.183058 13.1502C-0.0610194 12.9061 -0.0610194 12.5105 0.183058 12.2664L5.78283 6.66662L0.183058 1.06685C-0.0610194 0.82277 -0.0610194 0.427136 0.183058 0.183058C0.427136 -0.0610194 0.82277 -0.0610194 1.06685 0.183058L6.66662 5.78283L12.2664 0.183058Z"
                      fill="black"
                    />
                  </svg>
                  <h1 className="text-[16px] text-black font-roboto-mono font-medium">
                    Close Sidebar
                  </h1>
                </motion.button>

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
                  {portfolios.filter((p: any) => p.id !== currentId).map((item) => (
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
                        className="flex justify-between items-center w-full gap-[16px] cursor-pointer group"
                      >
                        <div className="flex flex-col md:max-w-[299px] w-[285px] h-full gap-[4px] min-w-0">
                          <h1 className="font-jakarta font-semibold text-[20px] w-full text-left truncate underline decoration-transparent group-hover:decoration-inherit transition-colors duration-300 underline-offset-4">
                            {item.title}
                          </h1>
                          <div className="flex items-center font-roboto-mono text-[14px]">
                            <span
                              className={`transition-all duration-300 flex items-center shrink-0 ${hoveredId === item.id ? "opacity-0 w-0 overflow-hidden" : "opacity-100 gap-1.5"}`}
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  width="16"
                                  height="16"
                                  rx="2"
                                  fill="#E5E7EB"
                                />
                                <path d="M4 4h8v8H4V4z" fill="#9CA3AF" />
                              </svg>
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
                        {item.images?.[0]?.url ? (
                          <img
                            src={item.images[0].url}
                            alt={item.title}
                            className="w-[90px] h-[60px] flex-shrink-0 object-cover rounded-[6px] bg-[#EFEFF0] border border-[#EFEFF0]"
                          />
                        ) : (
                          <div className="w-[90px] h-[60px] flex-shrink-0 rounded-[6px] bg-[#EFEFF0]" />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Navbar sm */}
      <div className="md:hidden flex justify-between items-center w-full h-[56px] px-[16px]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-[12px] cursor-pointer"
        >
          <div className="relative w-[20px] h-[20px] flex flex-col justify-center items-center">
            {/* Top line */}
            <span
              className={`absolute block h-[1.5px] bg-black rounded-full transition-all duration-300 ease-in-out ${
                isOpen
                  ? "w-[20px] rotate-45 translate-y-0"
                  : "w-[20px] -translate-y-[6px]"
              }`}
            />
            {/* Middle line */}
            <span
              className={`absolute block h-[1.5px] bg-black rounded-full transition-all duration-300 ease-in-out ${
                isOpen ? "w-0 opacity-0" : "w-[20px] opacity-100"
              }`}
            />
            {/* Bottom line */}
            <span
              className={`absolute block h-[1.5px] bg-black rounded-full transition-all duration-300 ease-in-out ${
                isOpen
                  ? "w-[20px] -rotate-45 translate-y-0"
                  : "w-[20px] translate-y-[6px]"
              }`}
            />
          </div>
          <h1 className="text-[16px] text-black font-roboto-mono font-medium">
            Other Works
          </h1>
        </button>
        <div className="flex items-center gap-6 ">
          <Link href="/">
            <button className="text-[16px] text-black font-roboto-mono cursor-pointer">
              Home
            </button>
          </Link>
          <button className="flex justify-end text-[16px]">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer"
            >
              <path
                d="M10.7451 19.25C10.7451 19.6642 10.4093 20 9.99512 20C9.5809 20 9.24512 19.6642 9.24512 19.25V17.25C9.24512 16.8358 9.5809 16.5 9.99512 16.5C10.4093 16.5 10.7451 16.8358 10.7451 17.25V19.25Z"
                fill="black"
              />
              <path
                d="M5.40039 14.5928C5.69325 14.8856 5.69325 15.3605 5.40039 15.6533L3.98633 17.0674C3.69347 17.3602 3.21864 17.3602 2.92578 17.0674C2.63292 16.7745 2.63292 16.2997 2.92578 16.0068L4.33984 14.5928C4.63271 14.2999 5.10753 14.2999 5.40039 14.5928Z"
                fill="black"
              />
              <path
                d="M17.0746 16.0064C17.3677 16.2994 17.3676 16.7747 17.0744 17.0677C16.7814 17.3604 16.3066 17.3603 16.0137 17.0674L14.5997 15.6534C14.3068 15.3605 14.3068 14.8856 14.5997 14.5927C14.8925 14.2999 15.3673 14.2998 15.6602 14.5926L17.0746 16.0064Z"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.99512 5C12.7565 5 14.9951 7.23858 14.9951 10C14.9951 12.7614 12.7565 15 9.99512 15C7.23369 15 4.99512 12.7614 4.99512 10C4.99512 7.23858 7.23369 5 9.99512 5ZM9.99512 6.5C8.06212 6.5 6.49512 8.067 6.49512 10C6.49512 11.933 8.06212 13.5 9.99512 13.5C11.9281 13.5 13.4951 11.933 13.4951 10C13.4951 8.067 11.9281 6.5 9.99512 6.5Z"
                fill="black"
              />
              <path
                d="M3.5 9.99512C3.5 10.4093 3.16421 10.7451 2.75 10.7451H0.75C0.335787 10.7451 0 10.4093 0 9.99512C0 9.5809 0.335786 9.24512 0.75 9.24512H2.75C3.16421 9.24512 3.5 9.5809 3.5 9.99512Z"
                fill="black"
              />
              <path
                d="M20 9.99512C20 10.4093 19.6642 10.7451 19.25 10.7451H17.25C16.8358 10.7451 16.5 10.4093 16.5 9.99512C16.5 9.5809 16.8358 9.24512 17.25 9.24512H19.25C19.6642 9.24512 20 9.5809 20 9.99512Z"
                fill="black"
              />
              <path
                d="M5.40723 4.33984C5.70009 4.63271 5.70009 5.10753 5.40723 5.40039C5.11436 5.69325 4.63954 5.69325 4.34668 5.40039L2.93262 3.98633C2.63976 3.69347 2.63976 3.21864 2.93262 2.92578C3.22548 2.63292 3.7003 2.63292 3.99316 2.92578L5.40723 4.33984Z"
                fill="black"
              />
              <path
                d="M17.0674 2.92578C17.3602 3.21864 17.3602 3.69347 17.0674 3.98633L15.6533 5.40039C15.3605 5.69325 14.8856 5.69325 14.5928 5.40039C14.2999 5.10753 14.2999 4.63271 14.5928 4.33984L16.0068 2.92578C16.2997 2.63292 16.7745 2.63292 17.0674 2.92578Z"
                fill="black"
              />
              <path
                d="M10.7451 2.75C10.7451 3.16421 10.4093 3.5 9.99512 3.5C9.5809 3.5 9.24512 3.16421 9.24512 2.75V0.75C9.24512 0.335787 9.5809 0 9.99512 0C10.4093 0 10.7451 0.335786 10.7451 0.75V2.75Z"
                fill="black"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default navbarProductDetail;

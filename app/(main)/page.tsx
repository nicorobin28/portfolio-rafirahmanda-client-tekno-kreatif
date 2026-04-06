"use client";

import React from "react";
import Card from "@/app/component/card";
import Link from "next/link";
import { useGlobalContext } from "../providers/GlobalProvider";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Page() {
  const { portfolios } = useGlobalContext();

  return (
    <div className="pb-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* HEADER SECTION */}
        <div className="w-full flex flex-col md:flex-row pt-[64px] pb-[64px] px-[20px] md:px-[120px] gap-[24px]">
          <motion.div
            variants={itemVariants}
            className="flex justify-between w-full items-start"
          >
            <p className="text-[40px] md:text-[62px] font-medium font-jakarta text-[#171718]">
              Rafi Rahmanda
            </p>
          </motion.div>

          <div className="flex justify-between items-end h-auto md:h-[77px] font-roboto">
            <motion.p
              variants={itemVariants}
              className="text-[#171718] text-[12px] md:text-[16px] w-auto md:w-[270px] md:pl-9 font-roboto"
            >
              UI/UX DESIGNER
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-[#171718] text-[12px] md:text-[16px] w-auto md:w-[270px] font-roboto"
            >
              PHNOM PENH, KH
            </motion.p>
          </div>
        </div>

        {/* PORTFOLIOS SECTION */}
        <div className="px-4 md:px-[120px]">
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
        </div>
      </motion.div>
    </div>
  );
}

import React from "react";
import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const index = () => {
  const [openIndex, setOpenIndex] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  const overviewRef = useRef<HTMLDivElement | null>(null);
  const guidelineRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = React.useRef<HTMLDivElement>(null);

  const sections = [
    { id: "overview", label: "1. Overview" },
    { id: "design", label: "2. Design System" },
    { id: "modular", label: "3. Modular - Journey Maker" },
    { id: "guideline", label: "4. Guideline" },
  ];
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      if (sentinelRef.current) {
        const top = sentinelRef.current.getBoundingClientRect().top;
        setIsSticky(top <= 0);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeItem = sections.find((item) => item.id === activeSection);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("[data-section]");
      let current = "";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();

        const triggerPoint = window.innerHeight * 0.5;

        if (rect.top <= triggerPoint && rect.bottom >= triggerPoint) {
          current = section.id;
        }
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="relative z-50">
      <div ref={sentinelRef} className="absolute -top-[1px] w-full h-[1px]" />

      {isSticky && isMobile && (
        <div className="flex flex-col gap-4 border border-transparent rounded-2xl p-4 opacity-0 pointer-events-none">
          <div className="flex items-center justify-between">
            <h3 className="text-[20px] font-semibold">{activeItem?.label}</h3>
            <ChevronDown className="w-5 h-5" />
          </div>
          <div
            className={`overflow-hidden ${openIndex ? "max-h-[200px]" : "max-h-[28px]"}`}
          >
            <ul className="flex flex-col gap-4 text-[14px] ml-2">
              {sections.map((item, index) => (
                <li
                  key={item.id}
                  onClick={() => {
                    const el = document.getElementById(item.id);
                    if (el) {
                      const y =
                        el.getBoundingClientRect().top + window.scrollY - 100;

                      window.scrollTo({
                        top: y,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className={`
    cursor-pointer
    ${index === 0 || openIndex ? "block" : "hidden"}
    ${activeSection === item.id ? "text-black font-semibold" : "text-gray-400"}
  `}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <motion.div
        layout
        className={`flex flex-col gap-4 overflow-hidden
  md:p-0 md:bg-transparent md:border-0 md:top-0 md:sticky md:block
  ${isSticky ? "fixed top-0 left-0 right-0" : "relative border md:border-0 "}
`}
        initial={false}
        animate={
          isSticky && isMobile
            ? {
                borderRadius: "0px",
                borderWidth: "0px",
                borderBottomWidth: "1px",
                borderColor: "#E5E7EB",
                padding: "16px 24px",
                boxShadow: "0px 10px 40px rgba(0,0,0,0.08)",
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(12px)",
              }
            : !isMobile
              ? {
                  borderRadius: "0px",
                  borderWidth: "0px",
                  borderBottomWidth: "0px",
                  borderColor: "",
                  padding: "0px 0px",
                  boxShadow: "0px 0px 0px rgba(0,0,0,0)",
                  backgroundColor: "transparent",
                  backdropFilter: "blur(0px)",
                }
              : {
                  borderRadius: "16px",
                  border: "1px solid #C7C8C9",
                  padding: "16px",
                  boxShadow: "0px 0px 0px rgba(0,0,0,0)",
                  backgroundColor: "rgba(255, 255, 255, 1)",
                  backdropFilter: "blur(0px)",
                }
        }
        transition={{ duration: 0.35, ease: "easeInOut" }}
      >
        <div
          className="flex items-center justify-between md:block cursor-pointer md:cursor-default "
          onClick={() => setOpenIndex(!openIndex)}
        >
          <motion.h3
            layout="position"
            className="text-[20px] font-semibold text-black"
          >
            Index
          </motion.h3>

          <ChevronDown
            className={`w-5 h-5 text-black transition-transform duration-300 md:hidden ${
              openIndex ? "rotate-180" : ""
            }`}
          />
        </div>

        <motion.div
          layout="position"
          className={`
        md:hidden overflow-hidden transition-all duration-300 ease-in-out 
        ${openIndex ? "max-h-[200px]" : "max-h-[28px]"}
      `}
        >
          <ul className="flex flex-col gap-4 text-[14px] ml-2">
            {sections.map((item) => (
              <li
                key={item.id}
                onClick={() => {
                  const el = document.getElementById(item.id);
                  if (el) {
                    const y =
                      el.getBoundingClientRect().top + window.scrollY - 100;

                    window.scrollTo({
                      top: y,
                      behavior: "smooth",
                    });
                  }
                }}
                className={`
        cursor-pointer
        ${item.id === activeSection || openIndex ? "block" : "hidden"}
        ${
          activeSection === item.id
            ? "text-black font-semibold"
            : "text-gray-400"
        }
      `}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="hidden md:block ">
          <ul className="flex flex-col p-3 gap-4 text-gray-500 text-[14px] ">
            <li className="group cursor-pointer">
              <p className="group-hover:hidden">1. Overview</p>
              <div className="hidden group-hover:flex items-center gap-[4px] ">
                <p className="font-medium">1. </p>
                <div className="flex items-center gap-[5px] font-roboto-mono">
                  <p className="underline font-bold text-black">
                    Jump to Section
                  </p>
                  <svg
                    width="12"
                    height="14"
                    viewBox="0 0 18 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.75 7.74993L15.4395 7.74993L10.4697 12.7197C10.1768 13.0126 10.1768 13.4873 10.4697 13.7802C10.7626 14.0731 11.2374 14.0731 11.5303 13.7802L17.7803 7.53021L17.874 7.41595C17.9556 7.29365 18 7.14909 18 6.99993C18 6.80102 17.9209 6.61031 17.7803 6.46966L11.5303 0.219661C11.2374 -0.0732318 10.7626 -0.0732318 10.4697 0.219661C10.1768 0.512554 10.1768 0.987314 10.4697 1.28021L15.4395 6.24993L0.75 6.24993C0.335787 6.24993 1.99576e-06 6.58572 8.34735e-08 6.99993C7.8534e-08 7.41415 0.335787 7.74993 0.75 7.74993Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </div>
            </li>
            <li className="group cursor-pointer">
              <p className="group-hover:hidden">2. Design System</p>
              <div className="hidden group-hover:flex items-center gap-[4px] ">
                <p className="font-medium">2. </p>
                <div className="flex items-center gap-[5px] font-roboto-mono">
                  <p className="underline font-bold text-black">
                    Jump to Section
                  </p>
                  <svg
                    width="12"
                    height="14"
                    viewBox="0 0 18 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.75 7.74993L15.4395 7.74993L10.4697 12.7197C10.1768 13.0126 10.1768 13.4873 10.4697 13.7802C10.7626 14.0731 11.2374 14.0731 11.5303 13.7802L17.7803 7.53021L17.874 7.41595C17.9556 7.29365 18 7.14909 18 6.99993C18 6.80102 17.9209 6.61031 17.7803 6.46966L11.5303 0.219661C11.2374 -0.0732318 10.7626 -0.0732318 10.4697 0.219661C10.1768 0.512554 10.1768 0.987314 10.4697 1.28021L15.4395 6.24993L0.75 6.24993C0.335787 6.24993 1.99576e-06 6.58572 8.34735e-08 6.99993C7.8534e-08 7.41415 0.335787 7.74993 0.75 7.74993Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default index;

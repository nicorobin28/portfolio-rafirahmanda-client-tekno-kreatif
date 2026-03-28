"use client";
import React, { useState, useEffect, useRef } from "react";
import img1 from "../assets/gambar1.png";
import img2 from "../assets/gambar2.png";
import img3 from "../assets/gambar3.png";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import MorphText from "../components/MorphText";

const INDEX_DATA = [
  { id: "overview", title: "Overview" },
  { id: "design-system", title: "Design System" },
  { id: "modular", title: "Modular - Journey Maker" },
  { id: "guideline", title: "Guideline" },
];

const Page = () => {
  const [openIndex, setOpenIndex] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState(INDEX_DATA[0].id);
  const [hoveredDesktopItem, setHoveredDesktopItem] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    INDEX_DATA.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offsetCount = isMobile ? window.innerHeight * 0.2 : 60;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offsetCount;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      if (isMobile) {
        setOpenIndex(false);
      }
    }
  };

  return (
    <section className="w-full bg-white px-6 md:px-12 lg:px-20 py-20">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-16">
        <div className="lg:sticky top-0 z-0 h-fit flex flex-col gap-12">
          {/* TITLE */}
          <h1 className="text-[48px] md:text-[56px] font-semibold leading-[56px] md:leading-[64px] tracking-[-0.005em] text-black">
            Increase 3X <br />
            Design Team <br />
            Productivity
          </h1>

          <div className="flex flex-col gap-5 text-[14px]">
            <div className="flex gap-12">
              <span className="w-[100px] font-roboto-mono text-[14px] leading-[22px] text-gray-500">
                Role
              </span>
              <span className="font-jakarta font-medium text-[14px] leading-[24px] text-black">
                Design System Specialist
              </span>
            </div>

            <div className="flex gap-12">
              <span className="w-[100px] font-roboto-mono text-[14px] leading-[22px] text-gray-500">
                Company
              </span>
              <span className="font-jakarta font-medium text-[14px] leading-[24px] text-black">
                cellcard
              </span>
            </div>

            <div className="flex gap-12">
              <span className="w-[100px] font-roboto-mono text-[14px] leading-[22px] text-gray-500">
                Year
              </span>
              <span className="font-jakarta font-medium text-[14px] leading-[24px] text-black">
                2025
              </span>
            </div>
          </div>

          {/* index */}
          <div className="relative z-50">
            {/* Sentinel element to track scroll position */}
            <div
              ref={sentinelRef}
              className="absolute -top-[1px] w-full h-[1px]"
            />

            {/* INVISIBLE PLACEHOLDER to prevent layout shift when fixed on mobile */}
            {isSticky && isMobile && (
              <div className="flex flex-col gap-4 border border-transparent rounded-2xl p-4 opacity-0 pointer-events-none">
                <div className="flex items-center justify-between">
                  <h3 className="text-[20px] font-semibold">Index</h3>
                  <ChevronDown className="w-5 h-5" />
                </div>
                <div
                  className={`overflow-hidden ${
                    openIndex ? "max-h-[200px]" : "max-h-[28px]"
                  }`}
                >
                  <ul className="flex flex-col gap-4 text-[14px] ml-2">
                    {INDEX_DATA.map((item) => (
                      <li
                        key={`placeholder-${item.id}`}
                        className={activeSection === item.id || openIndex ? "block" : "hidden"}
                      >
                        {item.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <motion.div
              layout
              className={`flex flex-col gap-4 border-[#C7C8C9] md:p-0 md:bg-transparent md:border-0 md:top-0 md:sticky md:block z-[100] ${
                isSticky && isMobile
                  ? "fixed top-0 left-0 right-0 overflow-y-auto max-h-[100vh]"
                  : "relative border overflow-hidden"
              }`}
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
                      padding: "0px",
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
                className="flex items-center justify-between md:block cursor-pointer md:cursor-default"
                onClick={() => {
                  if (isMobile) {
                    setOpenIndex(!openIndex);
                  }
                }}
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
        ${openIndex ? "max-h-[300px]" : "max-h-[28px]"}
      `}
              >
                <ul className="flex flex-col gap-4 text-[14px] ml-2 top-0 pb-2">
                  {INDEX_DATA.map((item) => {
                    const isActive = activeSection === item.id;
                    const isVisible = isActive || openIndex;
                    return (
                      <li
                        key={`mobile-${item.id}`}
                        className={`${
                          isVisible ? "block" : "hidden"
                        } cursor-pointer transition-colors duration-200 ${
                          isActive
                            ? "text-black font-semibold"
                            : "text-gray-500 hover:text-gray-800"
                        }`}
                        onClick={(e) => scrollToSection(item.id, e)}
                      >
                        {item.title}
                      </li>
                    );
                  })}
                </ul>
              </motion.div>

              <div className="hidden md:block">
                <ul className="flex flex-col gap-4 text-[14px]">
                  {INDEX_DATA.map((item) => {
                    const isHovered = hoveredDesktopItem === item.id;
                    return (
                      <li
                        key={`desktop-${item.id}`}
                        className="cursor-pointer text-gray-500 hover:text-gray-900 transition-colors duration-200"
                        onClick={(e) => scrollToSection(item.id, e)}
                        onMouseEnter={() => setHoveredDesktopItem(item.id)}
                        onMouseLeave={() => setHoveredDesktopItem(null)}
                      >
                        <MorphText
                          from={item.title}
                          to="Jump to section ->"
                          trigger={isHovered}
                          tickMs={28}
                          stagger={35}
                          spinCount={5}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* related topics */}
          <div className="hidden md:flex flex-col gap-4">
            <h3 className="text-[18px] font-semibold text-black">
              Related Topics
            </h3>
            <ul className="flex flex-col gap-3 text-gray-500 text-[14px]">
              <li className="cursor-pointer hover:text-black transition-colors">
                Add Gamification to Telco UI
              </li>
              <li className="cursor-pointer hover:text-black transition-colors">
                Strategize a Housing Area Website
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-12">
          <div className="bg-[#F3F3F3] rounded-2xl p-8 md:p-12 flex justify-center items-center gap-10">
            {/* hp 1 */}
            <div className="relative w-[140px] md:w-[180px] h-[280px] md:h-[360px] bg-black rounded-[32px] p-[6px] shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
              <div className="w-full h-full bg-white rounded-[28px] overflow-hidden">
                <img
                  src={img1.src}
                  alt="gambar 1"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* hp 2 */}
            <div className="relative w-[140px] md:w-[180px] h-[280px] md:h-[360px] bg-black rounded-[32px] p-[6px] shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
              <div className="w-full h-full bg-white rounded-[28px] overflow-hidden">
                <img
                  src={img2.src}
                  alt="gambar 2"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* hp 3 */}
            <div className="relative w-[140px] md:w-[180px] h-[280px] md:h-[360px] bg-black rounded-[32px] p-[6px] shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
              <div className="w-full h-full bg-white rounded-[28px] overflow-hidden">
                <img
                  src={img3.src}
                  alt="gambar 3"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="max-w-[640px] flex flex-col gap-12">
            {/* 1. Overview */}
            <div id="overview" className="flex flex-col gap-6 scroll-mt-32">
              <h2 className="text-[32px] font-semibold text-black">
                1. Overview
              </h2>

              <p className="text-gray-600 leading-relaxed">
                A temporary design approach used across all cellcard projects
                until cellcard App v1.0 officially launches.
              </p>

              <p className="text-gray-600 leading-relaxed">
                As of 7 November 2025, we currently have 3 different design
                styles:
                <br />
                1. CC Web (just launched)
                <br />
                2. CC App v10 (upcoming)
                <br />
                3. CC App v9 (old)
              </p>

              <p className="text-gray-600 leading-relaxed">
                These different styles create visual inconsistencies.
              </p>

              <p className="text-gray-600 leading-relaxed">
                Transition UI fixes this by providing one middle style, a balance
                between the CC web and CC App v10, so all ongoing projects look
                unified without copying the future app too early.
              </p>
            </div>

            {/* 2. Design System */}
            <div id="design-system" className="flex flex-col gap-6 scroll-mt-32">
              <h2 className="text-[32px] font-semibold text-black">
                2. Design System
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Building a unified design language that bridges the gap between current web implementations and the upcoming v10 application.
              </p>
            </div>

            {/* 3. Modular - Journey Maker */}
            <div id="modular" className="flex flex-col gap-6 scroll-mt-32">
              <h2 className="text-[32px] font-semibold text-black">
                3. Modular - Journey Maker
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Implementing a modular approach to allow flexible assembly of user journeys without hardcoding every possible path.
              </p>
            </div>

            {/* 4. Guideline */}
            <div id="guideline" className="flex flex-col gap-6 scroll-mt-32">
              <h2 className="text-[32px] font-semibold text-black">
                4. Guideline
              </h2>

              <p className="text-gray-600 leading-relaxed">
                A temporary design approach used across all cellcard projects
                until cellcard App v1.0 officially launches.
              </p>

              <p className="text-gray-600 leading-relaxed">
                As of 7 November 2025, we currently have 3 different design
                styles:
                <br />
                1. CC Web (just launched)
                <br />
                2. CC App v10 (upcoming)
                <br />
                3. CC App v9 (old)
              </p>

              <p className="text-gray-600 leading-relaxed">
                These different styles create visual inconsistencies.
              </p>

              <p className="text-gray-600 leading-relaxed">
                Transition UI fixes this by providing one middle style, a balance
                between the CC web and CC App v10, so all ongoing projects look
                unified without copying the future app too early.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:hidden">
            <h3 className="text-[18px] font-semibold text-black">
              Related Topics
            </h3>
            <ul className="flex flex-col gap-3 text-gray-500 text-[14px]">
              <li className="cursor-pointer hover:text-black transition-colors">
                Add Gamification to Telco UI
              </li>
              <li className="cursor-pointer hover:text-black transition-colors">
                Strategize a Housing Area Website
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;

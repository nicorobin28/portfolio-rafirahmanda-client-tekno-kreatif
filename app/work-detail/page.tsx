"use client";
import React from "react";
import img1 from "../assets/gambar1.png";
import img2 from "../assets/gambar2.png";
import img3 from "../assets/gambar3.png";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Descwork from "../component/descwork";
import Headmeta from "../component/headmeta";
import Index from "../component/index";
import Topic from "../component/topic";

const Page = () => {
  const [openIndex, setOpenIndex] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sentinelRef = React.useRef<HTMLDivElement>(null);
  const sectionsData = [
    {
      id: "overview",
      title: "Overview",
      content: [
        "A temporary design approach used across all cellcard projects until cellcard App v1.0 officially launches.",
        "As of 7 November 2025, we currently have 3 different design styles:",
        "1. CC Web (just launched)",
        "2. CC App v10 (upcoming)",
        "3. CC App v9 (old)",
        "These different styles create visual inconsistencies.",
        "Transition UI fixes this by providing one middle style, a balance between the CC web and CC App v10, so all ongoing projects look unified without copying the future app too early. This approach also ensures developers know which library to follow and reduces confusion across teams.",
      ],
    },
    {
      id: "guideline",
      title: "Guideline",
      content: [
        "A temporary design approach used across all cellcard projects until cellcard App v1.0 officially launches.",
        "As of 7 November 2025, we currently have 3 different design styles:",
        "1. CC Web (just launched)",
        "2. CC App v10 (upcoming)",
        "3. CC App v9 (old)",
        "These different styles create visual inconsistencies.",
        "Transition UI fixes this by providing one middle style, a balance between the CC web and CC App v10, so all ongoing projects look unified without copying the future app too early. This approach also ensures developers know which library to follow and reduces confusion across teams.",
      ],
    },
  ];
  return (
    <section className="w-full bg-white px-6 md:px-12 lg:px-20 py-20">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-16">
        <div className="lg:sticky top-0 z-0 h-fit flex flex-col gap-12">
          {/* TITLE */}
          <Headmeta />

          {/* index */}
          <Index />

          {/* related topics */}
          <div className="hidden md:flex">
            <Topic />
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

          {/* Overview */}
          <Descwork sections={sectionsData} />
          <div className="md:hidden">
            <Topic />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;

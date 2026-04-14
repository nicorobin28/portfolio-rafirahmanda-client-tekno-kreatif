"use client";
import React, { useState } from "react";
import Image from "next/image";
import MorphText from "@/components/MorphText";

interface CardProps {
  img: string;
  desc: {
    icon: React.ReactNode;
    name: string;
    year: string;
  };
  title: string;
  subtitle: string;
}

const Card: React.FC<CardProps> = ({ img, desc, title, subtitle }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex flex-row md:flex-col gap-8 md:gap-4 w-full cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Content wrapper */}
      <div className="flex flex-col gap-2 w-full order-1 md:order-2">
        {/* Desc */}
        <div className="flex items-center font-roboto-mono gap-2 text-[#5B5E61] text-[12px] px-[4px]">
          <div className="flex items-center gap-1.5 overflow-hidden">
            <div className="flex items-center shrink-0">{desc.icon}</div>
            <p className="truncate">{desc.name}</p>
          </div>
          <span className="shrink-0">
            <svg
              width="4"
              height="4"
              viewBox="0 0 4 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="2" cy="2" r="2" fill="#9C9EA1" />
            </svg>
          </span>
          <p className="shrink-0">{desc.year}</p>
        </div>

        {/* Title */}
        <div className="text-[#171718] font-jakarta px-[4px]">
          <h1 className="font-medium text-[20px] md:text-[26px] line-clamp-2 underline decoration-transparent group-hover:decoration-inherit transition-colors duration-300 underline-offset-4">
            {title}
          </h1>
        </div>

        {/* Subtitle / Read More */}
        <div
          className={`px-[4px] flex items-center transition-all duration-300 ${isHovered ? "pt-6" : "pt-0"}`}
        >
          <h1
            className={`flex items-center gap-2 ${isHovered ? "text-[#171718] font-roboto-mono font-medium underline underline-offset-4" : "text-[#5B5E61] font-jakarta text-[16px] line-clamp-2"}`}
          >
            <MorphText
              from={subtitle}
              to="Read More"
              trigger={isHovered}
              tickMs={1}
              stagger={1}
              spinCount={1}
              animateInitial={false}
            />
            <span
              className={`transition-all duration-300 ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 max-w-0 overflow-hidden"}`}
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
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

      {/* Image */}
      <div className="order-2 md:order-1 shrink-0">
        {/* Desktop Image */}
        <div className="hidden md:block w-full h-[162px] rounded-[8px] bg-[#F1F1F2] overflow-hidden">
          <Image
            src={img}
            alt={title}
            width={236}
            height={162}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Mobile Image */}
        <div className="block md:hidden w-[108px] h-[72px] rounded-[6px] bg-[#F1F1F2] overflow-hidden">
          <Image
            src={img}
            alt={title}
            width={108}
            height={72}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;

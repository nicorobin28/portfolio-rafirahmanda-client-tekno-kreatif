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
  isFeatured?: boolean;
  companyLogoUrl?: string | null;
}

const Card: React.FC<CardProps> = ({
  img,
  desc,
  title,
  subtitle,
  isFeatured,
  companyLogoUrl,
}) => {
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
        <div className="flex items-center font-roboto gap-2 text-[#5B5E61] text-[12px] px-[4px]">
          <div className="flex items-center gap-1.5 overflow-hidden">
            <div className="flex items-center shrink-0">
              {companyLogoUrl ? (
                <img
                  src={companyLogoUrl}
                  alt={desc.name}
                  className="w-[16px] h-[16px] object-contain rounded-sm"
                />
              ) : (
                desc.icon
              )}
            </div>
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
          <h1 className="font-semibold text-[20px] md:text-[26px] line-clamp-2 underline decoration-transparent group-hover:decoration-inherit transition-colors duration-300 underline-offset-4">
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
      <div className="order-2 md:order-1 shrink-0 relative z-0">
        {isFeatured && (
          <div className="absolute top-1 md:top-2 right-1 md:right-2 bg-[#0052FF] text-white rounded-[100px] px-1.5 py-[2px] md:px-2 md:py-1 flex items-center gap-[2px] md:gap-[4px] text-[12px] md:text-[12px] font-medium font-jakarta shadow-sm">
            <svg
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[14px] h-[14px]"
            >
              <path
                d="M9.16562 5.01074C9.18912 5.06319 9.24123 5.09694 9.2987 5.09694H12.2492C12.7814 5.09694 13.0354 5.75143 12.6424 6.11035L10.3763 8.45888C10.3342 8.49734 10.3184 8.55681 10.3358 8.61111L11.2996 12.0703C11.4613 12.5745 10.9211 13.0158 10.4592 12.7568L7.0714 11.0033C7.0271 10.9784 6.97306 10.9784 6.92876 11.0033L3.541 12.7568C3.07903 13.0158 2.53886 12.5745 2.70061 12.0703L3.66434 8.61111C3.68176 8.55681 3.66593 8.49734 3.62382 8.45888L1.35776 6.11035C0.964757 5.75143 1.21872 5.09694 1.75099 5.09694H4.70091C4.75837 5.09694 4.81048 5.06319 4.83398 5.01075L6.46793 1.51119C6.67386 1.05175 7.32623 1.05178 7.53212 1.51124L9.16562 5.01074ZM5.43917 5.79902C5.39216 5.9039 5.28795 5.9714 5.17301 5.9714H2.68279C2.61889 5.9714 2.5884 6.04998 2.63558 6.09308L4.5586 8.12876C4.6428 8.20567 4.67445 8.32461 4.63961 8.4332L3.81397 11.4615C3.79455 11.5221 3.85938 11.5751 3.91484 11.544L6.85747 10.0406C6.94606 9.991 7.0541 9.991 7.14268 10.0407L10.24 11.631L9.36052 8.43318C9.3257 8.3246 9.35735 8.20568 9.44154 8.12878L11.3646 6.09308C11.4118 6.04998 11.3813 5.9714 11.3174 5.9714H8.82715C8.71222 5.9714 8.608 5.9039 8.561 5.79902L7.06396 2.60478C7.03924 2.54962 6.96093 2.54962 6.9362 2.60478L5.43917 5.79902Z"
                fill="#F1F1F2"
              />
              <path
                d="M5.17301 5.9714H2.68279C2.61889 5.9714 2.5884 6.04998 2.63558 6.09308L4.5586 8.12876C4.6428 8.20567 4.67445 8.32461 4.63961 8.4332L3.81397 11.4615C3.79455 11.5221 3.85938 11.5751 3.91484 11.544L6.85747 10.0406C6.94606 9.991 7.0541 9.991 7.14268 10.0407L10.24 11.631L9.36052 8.43318C9.3257 8.3246 9.35735 8.20568 9.44154 8.12878L11.3646 6.09308C11.4118 6.04998 11.3813 5.9714 11.3174 5.9714H8.82715C8.71222 5.9714 8.608 5.9039 8.561 5.79902L7.06396 2.60478C7.03924 2.54962 6.96093 2.54962 6.9362 2.60478L5.43917 5.79902C5.39216 5.9039 5.28795 5.9714 5.17301 5.9714Z"
                fill="#F1F1F2"
              />
            </svg>
            Featured
          </div>
        )}
        {/* Desktop Image */}
        <div className="hidden md:block w-full aspect-video rounded-[8px] bg-[#F1F1F2] overflow-hidden">
          <img src={img} alt={title} className="w-full h-full object-cover" />
        </div>
        {/* Mobile Image */}
        <div className="block md:hidden w-[108px] h-[72px] rounded-[6px] bg-[#F1F1F2] overflow-hidden">
          <img
            src={img}
            alt={title}
            width="236"
            height="162"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;

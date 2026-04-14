"use client";

import Link from "next/link";
import React, { useState } from "react";
import MorphText from "@/components/MorphText";

interface TopicProps {
  topics: { id: string; title: string }[];
}

const Topic: React.FC<TopicProps> = ({ topics }) => {
  const [hoveredTopic, setHoveredTopic] = useState<string | null>(null);

  if (!topics || topics.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-[18px] font-medium text-black">Related Topics</h3>

      <ul className="flex flex-col gap-3 text-gray-500 text-[14px]">
        {topics.map((topic) => {
          const isHovered = hoveredTopic === topic.id;

          return (
            <li
              key={topic.id}
              onMouseEnter={() => setHoveredTopic(topic.id)}
              onMouseLeave={() => setHoveredTopic(null)}
            >
              <Link
                href={`/work-detail/${topic.id}`}
                className="flex items-center gap-2 transition-colors duration-200 hover:text-black"
              >
                <MorphText
                  from={topic.title}
                  to="Go to Work"
                  trigger={isHovered}
                  tickMs={1}
                  stagger={1}
                  spinCount={1}
                  className={
                    isHovered
                      ? "font-roboto text-[14px] font-normal underline leading-[22px]"
                      : ""
                  }
                />

                <span
                  className={`transition-all duration-300 ${
                    isHovered
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-2"
                  }`}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 18 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0 -rotate-45"
                  >
                    <path
                      d="M0.75 6.24994L15.4395 6.24994L10.4697 1.28022C10.1768 0.987324 10.1768 0.512563 10.4697 0.21967C10.7626 -0.0732233 11.2374 -0.0732233 11.5303 0.21967L17.7803 6.46967L17.874 6.58393C17.9556 6.70623 18 6.85079 18 6.99994C18 7.19886 17.9209 7.38956 17.7803 7.53022L11.5303 13.7802C11.2374 14.0731 10.7626 14.0731 10.4697 13.7802C10.1768 13.4873 10.1768 13.0126 10.4697 12.7197L15.4395 7.74994L0.75 7.74994C0.335787 7.74994 1.26963e-06 7.41416 0 6.99994C5.40172e-08 6.58573 0.335787 6.24994 0.75 6.24994Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Topic;

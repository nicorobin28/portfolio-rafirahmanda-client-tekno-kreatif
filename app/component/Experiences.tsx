"use client";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Experiences = () => {
  const formatDate = (value: string) => {
    const [year, month] = value.split("-");
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${months[parseInt(month) - 1]} ${year}`;
  };
  const [experience, setExperience] = useState<any[]>([]);
  const fetchExperience = async () => {
    try {
      const { data } = await axios.get("/api/experiences");
      setExperience(data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  useEffect(() => {
    fetchExperience();
  }, []);

  return (
    <div className="flex flex-col">
      {experience.map((item) => {
        const dateStartFormatted = formatDate(item.startDate);
        const dateEndFormatted =
          item.endDate !== null ? formatDate(item.endDate) : "Present";
        return (
          <div key={item.id} className="flex gap-5">
            <div className="w-auto flex flex-col items-center pt-2 gap-2">
              <div className="w-[10px] md:w-[12px] h-[10px] md:h-[12px] bg-[#E3E3E4] rounded-[999px]"></div>
              <div className="w-[2px] md:w-[3px] h-[50px] bg-[#E3E3E4]"></div>
            </div>
            <div className="flex flex-col gap-[4px]">
              <h1 className="text-[#171718] text-[18px] md:text-[20px] font-semibold font-jakarta">
                {item.company}
              </h1>
              <div className="flex items-center gap-[6px]">
                <p className="text-[#171718] text-[12px] md:text-[16px] font-roboto">
                  {dateStartFormatted}
                </p>
                <p className="text-[#171718] text-[12px] md:text-[16px] font-roboto">
                  -
                </p>
                <p className="text-[#171718] text-[12px] md:text-[16px] font-roboto">
                  {dateEndFormatted}
                </p>
                <div className="h-[4px] w-[4px] bg-[#9C9EA1] rounded-[999px]"></div>
                <p className="text-[#171718] text-[12px] md:text-[16px] font-roboto">
                  {item.position}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Experiences;

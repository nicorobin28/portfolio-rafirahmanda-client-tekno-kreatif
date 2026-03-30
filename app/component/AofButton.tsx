"use client";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const AofButton = () => {
  const [aof, setAof] = useState<any[]>([]);
  const fetchAof = async () => {
    try {
      const { data } = await axios.get("/api/area-of-focus");
      setAof(data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  useEffect(() => {
    fetchAof();
  }, []);

  return (
    <div className="flex flex-wrap gap-[12px]">
      {aof.map((item) => (
        <div
          key={item.id}
          className="w-auto pt-[2px] px-[12px] pb-[4px] border-1 border-[#C7C8C9] rounded-[999px]"
        >
          <p className="text-[#171718] text-center text-[16px] font-jakarta">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AofButton;

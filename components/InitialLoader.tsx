"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import MorphText from "@/components/MorphText";

interface InitialLoaderProps {
  isLoadingData: boolean;
  onComplete: () => void;
}

const InitialLoader = ({ isLoadingData, onComplete }: InitialLoaderProps) => {
  // Phase 1: "Welcome" + "Portfolio" spin simultaneously
  // Phase 2: once data loaded & phase1 resolved → "Role" animation starts
  // Phase 3: once Role resolves → trigger exit

  const [dataReady, setDataReady] = useState(false);
  const [nameSettled, setNameSettled] = useState(false);
  const [locationSettled, setLocationSettled] = useState(false);
  const [roleStarted, setRoleStarted] = useState(false);
  const [roleSettled, setRoleSettled] = useState(false);

  // Track when data is ready
  useEffect(() => {
    if (!isLoadingData) {
      setDataReady(true);
    }
  }, [isLoadingData]);

  // Phase 1 → Phase 2: when data is ready AND both name & location settled, start role
  useEffect(() => {
    if (dataReady && nameSettled && locationSettled) {
      // Small visual pause before role text appears
      const t = setTimeout(() => setRoleStarted(true), 200);
      return () => clearTimeout(t);
    }
  }, [dataReady, nameSettled, locationSettled]);

  // Phase 3: when role settled, trigger loader exit after brief pause
  useEffect(() => {
    if (roleSettled) {
      const t = setTimeout(() => onComplete(), 600);
      return () => clearTimeout(t);
    }
  }, [roleSettled, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 0.98,
        filter: "blur(4px)",
      }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 z-[999] bg-white overflow-hidden"
    >
      <div className="w-full flex flex-col md:flex-row pt-[64px] pb-[64px] px-[20px] md:px-[120px] gap-[24px]">
        {/* Name */}
        <div className="flex justify-between w-full items-start">
          <p className="text-[40px] md:text-[62px] font-medium font-jakarta text-[#171718]">
            <MorphText
              from="Welcome"
              to="Rafi Rahmanda"
              trigger={true}
              isLooping={!dataReady}
              onComplete={() => setNameSettled(true)}
              tickMs={28}
              stagger={38}
              spinCount={8}
            />
          </p>
        </div>

        <div className="flex justify-between items-end h-auto md:h-[77px] font-roboto">
          {/* Role — starts only after name + location settled */}
          <p className="text-[#171718] text-[12px] md:text-[16px] w-auto md:w-[270px] md:pl-9 font-roboto">
            {roleStarted ? (
              <MorphText
                from="Role"
                to="UI/UX DESIGNER"
                trigger={true}
                animateInitial={true}
                onComplete={() => setRoleSettled(true)}
                tickMs={22}
                stagger={30}
                spinCount={6}
              />
            ) : (
              <span className="opacity-0">Role</span>
            )}
          </p>

          {/* Location — starts immediately with name */}
          <p className="text-[#171718] text-[12px] md:text-[16px] w-auto md:w-[270px] font-roboto">
            <MorphText
              from="Portfolio"
              to="PHNOM PENH, KH"
              trigger={true}
              isLooping={!dataReady}
              onComplete={() => setLocationSettled(true)}
              tickMs={22}
              stagger={30}
              spinCount={6}
            />
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default InitialLoader;

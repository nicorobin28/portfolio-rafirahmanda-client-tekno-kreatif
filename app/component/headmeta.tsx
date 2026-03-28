import React from "react";

const headmeta = () => {
  return (
    <div className="z-0">
      <h1 className="text-[48px] md:text-[56px] font-semibold leading-[56px] md:leading-[64px] tracking-[-0.005em] text-black">
        Increase 3X <br />
        Design Team <br />
        Productivity
      </h1>

      <div className="flex flex-col gap-5 text-[14px] mt-10 ">
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
    </div>
  );
};

export default headmeta;

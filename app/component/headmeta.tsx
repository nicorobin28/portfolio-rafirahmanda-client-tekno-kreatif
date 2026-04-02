import React from "react";

interface HeadmetaProps {
  title: string;
  role: string;
  company: string;
  year: string;
}

const Headmeta: React.FC<HeadmetaProps> = ({ title, role, company, year }) => {
  return (
    <div className="z-0">
      <h1
        className="text-[48px] md:text-[56px] font-semibold leading-[56px] md:leading-[64px] tracking-[-0.005em] text-black"
        dangerouslySetInnerHTML={{ __html: title.replace(/\\n/g, "<br />") }}
      ></h1>

      <div className="flex flex-col gap-5 text-[14px] mt-10 ">
        <div className="flex gap-12">
          <span className="w-[100px] font-roboto-mono text-[14px] leading-[22px] text-[#8E9184]">
            Role
          </span>
          <span className="font-jakarta font-medium text-[14px] leading-[24px] text-black">
            {role}
          </span>
        </div>

        <div className="flex gap-12">
          <span className="w-[100px] font-roboto-mono text-[14px] leading-[22px] text-[#8E9184]">
            Company
          </span>
          <span className="font-jakarta font-medium text-[14px] leading-[24px] text-black">
            {company}
          </span>
        </div>

        <div className="flex gap-12">
          <span className="w-[100px] font-roboto-mono text-[14px] leading-[22px] text-[#8E9184]">
            Year
          </span>
          <span className="font-jakarta font-medium text-[14px] leading-[24px] text-black">
            {year}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Headmeta;

"use client";
import { useState } from "react";
import Image from "next/image";
import { navigate } from "../data/navigate";
import { focus } from "../data/focus";
import { experience } from "../data/experience";

const about = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
    setTimeout(() => setShow(false), 3000);
  };
  return (
    <div className="flex">
      <aside className="sticky top-0 z-0 bg-[#ffffff] w-full h-screen hidden lg:flex flex-col justify-center items-center ">
        <div className="bg-[#ffffff] w-[588px] h-auto flex flex-col gap-[48px]">
          <h1 className="text-[72px] text-[#171718] font-semibold font-jakarta">
            Rafi Rahmanda
          </h1>
          <Image
            className="dark:invert rounded-[908px]"
            src="/assets/profil.png"
            alt="Next.js logo"
            width={232}
            height={232}
            priority
          />
          <div className="flex flex-col">
            {navigate.map((nav) => (
              <div
                key={nav.id}
                onClick={handleShow}
                className="group h-[40px] flex items-center gap-[24px] cursor-pointer"
              >
                <div className="w-[110px] flex items-center gap-[4px]">
                  <p className="text-[14px] text-[#171718] font-roboto">
                    {nav.title}
                  </p>
                  {nav.icon}
                </div>
                <div className="relative text-[14px] text-[#5B5E61] font-jakarta">
                  <p className="transition-opacity duration-200 group-hover:opacity-0">
                    {nav.desc}
                  </p>
                  <p className="absolute top-0 left-0 transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                    {nav.isHovered}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`bg-[#5B5E61] drop-shadow-xl drop-shadow-[#171718]/32 absolute z-10 bottom-[80px] right-7/8 translate-x-7/8 w-[343px] px-[16px] py-[13px] rounded-[8px] ${show ? "flex opacity-100" : "hidden opacity-0"}`}
        >
          <p className="text-[#ffffff] text-[16px] font-jakarta">
            Copied to clipboard
          </p>
        </div>
      </aside>

      <main className="bg-[#ffffff] w-full flex justify-center items-center py-15 ">
        <div className="bg-[#fffff] w-[358px] lg:w-[588px] h-auto flex flex-col gap-[64px]">
          <div className=" w-[358px] h-auto flex lg:hidden flex-col gap-[24px]">
            <h1 className="text-[40px] text-[#171718] font-semibold font-jakarta">
              Rafi Rahmanda
            </h1>
            <Image
              className="dark:invert rounded-[908px]"
              src="/assets/profil.png"
              alt="Next.js logo"
              width={120}
              height={120}
              priority
            />
            <div className="flex flex-col">
              {navigate.map((nav) => (
                <div
                  key={nav.id}
                  onClick={handleShow}
                  className="group h-[40px] flex items-center gap-[24px] cursor-pointer"
                >
                  <div className="w-[110px] flex items-center gap-[4px]">
                    <p className="text-[14px] text-[#171718] font-roboto">
                      {nav.title}
                    </p>
                    {nav.icon}
                  </div>
                  <div className="relative text-[14px] text-[#5B5E61] font-jakarta">
                    <p className="transition-opacity duration-200 group-hover:opacity-0">
                      {nav.desc}
                    </p>
                    <p className="absolute top-0 left-0 transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                      {nav.isHovered}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div
              className={`bg-[#5B5E61] drop-shadow-xl drop-shadow-[#171718]/32 absolute z-10 top-[80px] w-[358px] px-[16px] py-[13px] rounded-[8px]  ${show ? "flex opacity-100" : "hidden opacity-0"}`}
            >
              <p className="text-[#ffffff] text-[16px] font-jakarta">
                Copied to clipboard
              </p>
            </div>
          </div>

          <div className="text-[16px] lg:text-[20px] text-[#171718] font-jakarta">
            <p className="font-bold">
              UI/UX Designer based in Phnom Penh, Cambodia.
            </p>
            <p>
              I design complex digital products, from scalable design systems to
              end-to-end user journeys that help teams move faster and ship
              better products.
            </p>
          </div>
          <div className="flex flex-col gap-[24px]">
            <h1 className="text-[#171718] text-[24px] lg:text-[32px] font-semibold font-jakarta">
              Area of Focus
            </h1>
            <div className="flex gap-[12px]">
              {focus.map((item) => (
                <div
                  key={item.id}
                  className="pt-[2px] px-[12px] pb-[4px] border-1 border-[#C7C8C9] rounded-[999px]"
                >
                  <p className="text-[#171718] text-center text-[12px] lg:text-[16px] font-jakarta">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-[24px]">
            <h1 className="text-[#171718] text-[24px] lg:text-[32px] font-semibold font-jakarta">
              Experience
            </h1>
            <div className="flex flex-col">
              {experience.map((item) => (
                <div key={item.id} className="flex gap-5">
                  <div className="w-auto flex flex-col items-center pt-2 gap-2">
                    <div className="w-[10px] lg:w-[12px] h-[10px] lg:h-[12px] bg-[#E3E3E4] rounded-[999px]"></div>
                    <div className="w-[2px] lg:w-[3px] h-[50px] bg-[#E3E3E4]"></div>
                  </div>
                  <div className="flex flex-col gap-[4px]">
                    <h1 className="text-[#171718] text-[18px] lg:text-[20px] font-semibold font-jakarta">
                      {item.title}
                    </h1>
                    <div className="flex items-center gap-[6px]">
                      <p className="text-[#171718] text-[12px] lg:text-[16px] font-roboto">
                        {item.time}
                      </p>
                      <div className="h-[4px] w-[4px] bg-[#9C9EA1] rounded-[999px]"></div>
                      <p className="text-[#171718] text-[12px] lg:text-[16px] font-roboto">
                        {item.job}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default about;

"use client";
import { useState } from "react";
import Image from "next/image";
import { navigate } from "../data/navigate";
import { focus } from "../data/focus";
import { experience } from "../data/experience";
import AofButton from "../component/AofButton";
import Experiences from "../component/Experiences";

const about = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
    setTimeout(() => setShow(false), 3000);
  };
  return (
    <div className="flex">
      <aside className="sticky top-0 z-0 bg-[#ffffff] w-full h-screen hidden md:flex flex-col justify-center items-center ">
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
        <div className="bg-[#fffff] w-[358px] md:w-[588px] h-auto flex flex-col gap-[64px]">
          <div className=" w-[358px] h-auto flex md:hidden flex-col gap-[24px]">
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

          <div className="text-[16px] md:text-[20px] text-[#171718] font-jakarta">
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
            <h1 className="text-[#171718] text-[24px] md:text-[32px] font-semibold font-jakarta">
              Area of Focus
            </h1>
            <div>
              <AofButton />
            </div>
          </div>
          <div className="flex flex-col gap-[24px]">
            <h1 className="text-[#171718] text-[24px] md:text-[32px] font-semibold font-jakarta">
              Experience
            </h1>
            <div>
              <Experiences />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default about;

"use client";
import { useState } from "react";
import Image from "next/image";
import { navigate } from "../../data/navigate";
import { focus } from "../../data/focus";
import { experience } from "../../data/experience";
import AofButton from "../../component/AofButton";
import Experiences from "../../component/Experiences";
import { string } from "zod";
import MorphText from "@/components/MorphText";

const about = () => {
  const [show, setShow] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [handleCopy, setHandleCopy] = useState<string | null>("");

  const handleShow = () => {
    setShow(true);
    setTimeout(() => setShow(false), 3000);
  };

  const handleNavClick = (nav: any) => {
    nav.action?.();

    if (nav.title === "Email") {
      setHandleCopy("Email");
      setShow(true);

      setTimeout(() => {
        setShow(false);
        setHandleCopy("");
      }, 3000);
    }
  };

  return (
    <div className="flex gap-[20px] px-[16px] md:px-[120px]">
      <aside className="sticky top-0 z-0 bg-[#ffffff] w-full h-screen hidden md:flex flex-col justify-start pt-8">
        <div className="bg-[#ffffff] w-[550px] h-auto flex flex-col gap-[30px]">
          {/* gap48 */}
          <h1 className="text-[65px] text-[#171718] font-medium font-jakarta">
            Rafi Rahmanda
          </h1>
          {/* text72 */}
          <Image
            className="dark:invert rounded-[908px]"
            src="/assets/profil.png"
            alt="Next.js logo"
            width={180} //232
            height={180}
            priority
          />
          <div className="flex flex-col">
            {navigate.map((nav) => {
              const isHovered = hovered === nav.id;
              return (
                <div
                  key={nav.id}
                  onClick={() => handleNavClick(nav)}
                  className="group h-[40px] flex items-center gap-[24px] cursor-pointer "
                  onMouseEnter={() => setHovered(nav.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div className="flex gap-[24px]" onClick={nav.action}>
                    <div className="w-[110px] flex items-center gap-[4px]">
                      <p className="text-[14px] text-[#171718] font-roboto">
                        {nav.title}
                      </p>
                      {nav.icon}
                    </div>
                    <div className="relative text-[14px] text-[#5B5E61] font-jakarta">
                      <MorphText
                        from={nav.desc}
                        to={nav.isHovered}
                        trigger={isHovered}
                        tickMs={35}
                        stagger={35}
                        spinCount={5}
                        animateInitial={false}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {show && handleCopy === "Email" && (
          <div
            className={`bg-[#5B5E61] drop-shadow-xl drop-shadow-[#171718]/32 absolute z-10 bottom-[80px] right-8/8 translate-x-8/8 w-[343px] px-[16px] py-[13px] rounded-[8px] ${show ? "flex opacity-100" : "hidden opacity-0"}`}
          >
            <p className="text-[#ffffff] text-[16px] font-jakarta">
              Copied to clipboard
            </p>
          </div>
        )}
      </aside>

      <main className="w-full flex justify-center items-center py-20 md:py-15 ">
        <div className="w-auto md:w-[550px] h-auto flex flex-col gap-[64px]">
          <div className=" w-[358px] h-auto flex md:hidden flex-col gap-[24px]">
            <h1 className="text-[40px] text-[#171718] font-medium font-jakarta">
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
                  onClick={() => handleNavClick(nav)}
                  className="group h-[40px] flex items-center gap-[24px] cursor-pointer"
                >
                  <div className="w-[110px] flex items-center gap-[4px]">
                    <p className="text-[14px] text-[#171718] font-roboto">
                      {nav.title}
                    </p>
                    {nav.icon}
                  </div>
                  <div className="text-[14px] text-[#5B5E61] font-jakarta">
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
            <p className="font-bold leading-[34px]">
              UI/UX Designer based in Phnom Penh, Cambodia.
            </p>
            <p>
              I design complex digital products, from scalable design systems to
              end-to-end user journeys that help teams move faster and ship
              better products.
            </p>
          </div>
          <div className="flex flex-col gap-[24px]">
            <h1 className="text-[#171718] text-[24px] md:text-[32px] font-medium font-jakarta">
              Area of Focus
            </h1>
            <div>
              <AofButton />
            </div>
          </div>
          <div className="flex flex-col gap-[24px]">
            <h1 className="text-[#171718] text-[24px] md:text-[32px] font-medium font-jakarta">
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

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navbarProductDetail = () => {
  const menuDesktop: { id: number; name: string; path: string }[] = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "About",
      path: "/about",
    },
  ];

  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  type data = {
    id: number;
    title: string;
    desc: {
      icon: React.ReactNode;
      subtitle: string;
      year: string;
    };
  };

  const dummyCard: data[] = [
    {
      id: 1,
      title: "Add Gamification to Telco UI",
      desc: {
        icon: (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <rect width="16" height="16" fill="url(#pattern0_9083_1389)" />
            <defs>
              <pattern
                id="pattern0_9083_1389"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use
                  xlinkHref="#image0_9083_1389"
                  transform="scale(0.00444444)"
                />
              </pattern>
              <image
                id="image0_9083_1389"
                width="225"
                height="225"
                preserveAspectRatio="none"
                xlinkHref="data:image/png;base64,..."
              />
            </defs>
          </svg>
        ),
        subtitle: "cellcard",
        year: "2026",
      },
    },
    {
      id: 2,
      title: "Build cellcard Iconography",
      desc: {
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect width="16" height="16" fill="url(#pattern0_9083_960)" />
          </svg>
        ),
        subtitle: "cellcard",
        year: "2026",
      },
    },
    {
      id: 3,
      title: "Build Coupon Platform Build Coupon Platform",
      desc: {
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect width="16" height="16" fill="url(#pattern0_9083_960)" />
          </svg>
        ),
        subtitle: "cellcard",
        year: "2026",
      },
    },
    {
      id: 4,
      title: "Build Coupon Platform Build Coupon Platform",
      desc: {
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect width="16" height="16" fill="url(#pattern0_9083_960)" />
          </svg>
        ),
        subtitle: "cellcard",
        year: "2026",
      },
    },
    {
      id: 5,
      title: "Build Coupon Platform Build Coupon Platform",
      desc: {
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect width="16" height="16" fill="url(#pattern0_9083_960)" />
          </svg>
        ),
        subtitle: "cellcard",
        year: "2026",
      },
    },
    {
      id: 6,
      title: "Build Coupon Platform Build Coupon Platform",
      desc: {
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect width="16" height="16" fill="url(#pattern0_9083_960)" />
          </svg>
        ),
        subtitle: "cellcard",
        year: "2026",
      },
    },
    {
      id: 7,
      title: "Build Coupon Platform Build Coupon Platform",
      desc: {
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect width="16" height="16" fill="url(#pattern0_9083_960)" />
          </svg>
        ),
        subtitle: "cellcard",
        year: "2026",
      },
    },
    {
      id: 8,
      title: "Build Coupon Platform Build Coupon Platform",
      desc: {
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect width="16" height="16" fill="url(#pattern0_9083_960)" />
          </svg>
        ),
        subtitle: "cellcard",
        year: "2026",
      },
    },
    {
      id: 9,
      title: "Build Coupon Platform Build Coupon Platform",
      desc: {
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect width="16" height="16" fill="url(#pattern0_9083_960)" />
          </svg>
        ),
        subtitle: "cellcard",
        year: "2026",
      },
    },
    {
      id: 10,
      title: "Build Coupon Platform Build Coupon Platform",
      desc: {
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect width="16" height="16" fill="url(#pattern0_9083_960)" />
          </svg>
        ),
        subtitle: "cellcard",
        year: "2026",
      },
    },
  ];

  return (
    // Navbar md-lg
    <div>
      <div
        className="hidden md:flex justify-between items-center w-full h-[64px] md:px-12 lg:px-[120px] 
                bg-white/75 backdrop-blur-2xl font-roboto-mono"
      >
        {/* ButtonSideBar */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 cursor-pointer"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.7087 15.4166C18.0538 15.4166 18.3337 15.6965 18.3337 16.0416C18.3337 16.3868 18.0538 16.6666 17.7087 16.6666H2.29199C1.94681 16.6666 1.66699 16.3868 1.66699 16.0416C1.66699 15.6965 1.94681 15.4166 2.29199 15.4166H17.7087Z"
              fill="black"
            />
            <path
              d="M17.7087 9.37498C18.0538 9.37498 18.3337 9.6548 18.3337 9.99998C18.3337 10.3452 18.0538 10.625 17.7087 10.625H2.29199C1.94681 10.625 1.66699 10.3452 1.66699 9.99998C1.66699 9.6548 1.94681 9.37498 2.29199 9.37498H17.7087Z"
              fill="black"
            />
            <path
              d="M17.7087 3.33331C18.0538 3.33331 18.3337 3.61314 18.3337 3.95831C18.3337 4.30349 18.0538 4.58331 17.7087 4.58331H2.29199C1.94681 4.58331 1.66699 4.30349 1.66699 3.95831C1.66699 3.61314 1.94681 3.33331 2.29199 3.33331H17.7087Z"
              fill="black"
            />
          </svg>
          <h1 className="text-[16px] text-black font-roboto-mono font-medium">
            Other Works
          </h1>
        </button>
        <div className="flex md:gap-18 lg:gap-24">
          {menuDesktop.map((item) => {
            const isActive = pathname === item.path;

            return (
              <Link href={item.path} key={item.id}>
                <button
                  className={`flex justify-end w-[172px] text-[16px] font-medium text-black`}
                >
                  {isActive ? (
                    <span className="flex gap-[8px]">
                      <span className="text-blue-500 pr">[</span>
                      {item.name}
                      <span className="text-blue-500">]</span>
                    </span>
                  ) : (
                    <h1 className="cursor-pointer">{item.name}</h1>
                  )}
                </button>
              </Link>
            );
          })}
          <button className="flex justify-end w-[172px] text-[16px]">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer"
            >
              <path
                d="M10.7451 19.25C10.7451 19.6642 10.4093 20 9.99512 20C9.5809 20 9.24512 19.6642 9.24512 19.25V17.25C9.24512 16.8358 9.5809 16.5 9.99512 16.5C10.4093 16.5 10.7451 16.8358 10.7451 17.25V19.25Z"
                fill="black"
              />
              <path
                d="M5.40039 14.5928C5.69325 14.8856 5.69325 15.3605 5.40039 15.6533L3.98633 17.0674C3.69347 17.3602 3.21864 17.3602 2.92578 17.0674C2.63292 16.7745 2.63292 16.2997 2.92578 16.0068L4.33984 14.5928C4.63271 14.2999 5.10753 14.2999 5.40039 14.5928Z"
                fill="black"
              />
              <path
                d="M17.0746 16.0064C17.3677 16.2994 17.3676 16.7747 17.0744 17.0677C16.7814 17.3604 16.3066 17.3603 16.0137 17.0674L14.5997 15.6534C14.3068 15.3605 14.3068 14.8856 14.5997 14.5927C14.8925 14.2999 15.3673 14.2998 15.6602 14.5926L17.0746 16.0064Z"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.99512 5C12.7565 5 14.9951 7.23858 14.9951 10C14.9951 12.7614 12.7565 15 9.99512 15C7.23369 15 4.99512 12.7614 4.99512 10C4.99512 7.23858 7.23369 5 9.99512 5ZM9.99512 6.5C8.06212 6.5 6.49512 8.067 6.49512 10C6.49512 11.933 8.06212 13.5 9.99512 13.5C11.9281 13.5 13.4951 11.933 13.4951 10C13.4951 8.067 11.9281 6.5 9.99512 6.5Z"
                fill="black"
              />
              <path
                d="M3.5 9.99512C3.5 10.4093 3.16421 10.7451 2.75 10.7451H0.75C0.335787 10.7451 0 10.4093 0 9.99512C0 9.5809 0.335786 9.24512 0.75 9.24512H2.75C3.16421 9.24512 3.5 9.5809 3.5 9.99512Z"
                fill="black"
              />
              <path
                d="M20 9.99512C20 10.4093 19.6642 10.7451 19.25 10.7451H17.25C16.8358 10.7451 16.5 10.4093 16.5 9.99512C16.5 9.5809 16.8358 9.24512 17.25 9.24512H19.25C19.6642 9.24512 20 9.5809 20 9.99512Z"
                fill="black"
              />
              <path
                d="M5.40723 4.33984C5.70009 4.63271 5.70009 5.10753 5.40723 5.40039C5.11436 5.69325 4.63954 5.69325 4.34668 5.40039L2.93262 3.98633C2.63976 3.69347 2.63976 3.21864 2.93262 2.92578C3.22548 2.63292 3.7003 2.63292 3.99316 2.92578L5.40723 4.33984Z"
                fill="black"
              />
              <path
                d="M17.0674 2.92578C17.3602 3.21864 17.3602 3.69347 17.0674 3.98633L15.6533 5.40039C15.3605 5.69325 14.8856 5.69325 14.5928 5.40039C14.2999 5.10753 14.2999 4.63271 14.5928 4.33984L16.0068 2.92578C16.2997 2.63292 16.7745 2.63292 17.0674 2.92578Z"
                fill="black"
              />
              <path
                d="M10.7451 2.75C10.7451 3.16421 10.4093 3.5 9.99512 3.5C9.5809 3.5 9.24512 3.16421 9.24512 2.75V0.75C9.24512 0.335787 9.5809 0 9.99512 0C10.4093 0 10.7451 0.335786 10.7451 0.75V2.75Z"
                fill="black"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* MenuSideBar */}
      <div
        className="fixed z-10 md:z-0 md:top-0 overflow-y-scroll no-scrollbar bg-white/75 backdrop-blur-2xl flex border-r 
      border-[#C7C8C9] px-4 w-full"
      >
        {isOpen && (
          <div className="h-screen md:w-109 w-full">
            <button
              onClick={() => setIsOpen(false)}
              className="flex items-center md:justify-center gap-3 cursor-pointer h-16 w-full px-4 md:px-0"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.2664 0.183058C12.5105 -0.0610194 12.9061 -0.0610194 13.1502 0.183058C13.3943 0.427136 13.3943 0.82277 13.1502 1.06685L7.55041 6.66662L13.1502 12.2664C13.3943 12.5105 13.3943 12.9061 13.1502 13.1502C12.9061 13.3943 12.5105 13.3943 12.2664 13.1502L6.66662 7.55041L1.06685 13.1502C0.82277 13.3943 0.427136 13.3943 0.183058 13.1502C-0.0610194 12.9061 -0.0610194 12.5105 0.183058 12.2664L5.78283 6.66662L0.183058 1.06685C-0.0610194 0.82277 -0.0610194 0.427136 0.183058 0.183058C0.427136 -0.0610194 0.82277 -0.0610194 1.06685 0.183058L6.66662 5.78283L12.2664 0.183058Z"
                  fill="black"
                />
              </svg>
              <h1 className="text-[16px] text-black font-roboto-mono font-medium">
                Close Sidebar
              </h1>
            </button>
            <div className="text-black md:pt-10 w-full">
              {dummyCard.map((item) => (
                <div key={item.id} className="p-4 w-full">
                  <div className="flex justify-between cursor-pointer group">
                    <div className="flex flex-col gap-[4px] group-hover:underline group-hover:gap-[4px]">
                      <h1 className="font-jakarta font-semibold text-[20px] w-60 text-left truncate ">
                        {item.title}
                      </h1>
                      <div className="flex items-center font-roboto-mono gap-2 text-[#5B5E61] text-[14px] group-hover:hidden">
                        <div className="flex items-center gap-1.5">
                          <>{item.desc.icon}</>
                          <p>{item.desc.subtitle}</p>
                        </div>
                        <span>
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
                        <p>{item.desc.year}</p>
                      </div>

                      <div className="hidden group-hover:flex hover:underline items-center gap-[2px]">
                        <p className="text-[14px] font-semibold">Read More</p>
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 11 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.146447 9.81404L8.9606 0.999893H3.33228C3.05614 0.999893 2.83234 0.776089 2.83234 0.499947C2.83234 0.223805 3.05614 2.95028e-07 3.33228 4.21469e-08L10.1676 0L10.2657 0.00966747C10.3618 0.028886 10.4509 0.0760812 10.5212 0.146393C10.615 0.240161 10.6676 0.367338 10.6676 0.499947V7.33531C10.6676 7.61145 10.4438 7.83526 10.1676 7.83526C9.89151 7.83526 9.6677 7.61145 9.6677 7.33531V1.707L0.853553 10.5211C0.658291 10.7164 0.341709 10.7164 0.146447 10.5211C-0.0488155 10.3259 -0.0488155 10.0093 0.146447 9.81404Z"
                            fill="black"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="w-22.5 h-15 rounded-[6px] bg-[#EFEFF0]"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navbar sm */}
      <div className="md:hidden flex justify-between items-center w-full h-[56px] px-[16px] bg-white/75 backdrop-blur-2xl">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-[12px] cursor-pointer"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.7087 15.4166C18.0538 15.4166 18.3337 15.6965 18.3337 16.0416C18.3337 16.3868 18.0538 16.6666 17.7087 16.6666H2.29199C1.94681 16.6666 1.66699 16.3868 1.66699 16.0416C1.66699 15.6965 1.94681 15.4166 2.29199 15.4166H17.7087Z"
              fill="black"
            />
            <path
              d="M17.7087 9.37498C18.0538 9.37498 18.3337 9.6548 18.3337 9.99998C18.3337 10.3452 18.0538 10.625 17.7087 10.625H2.29199C1.94681 10.625 1.66699 10.3452 1.66699 9.99998C1.66699 9.6548 1.94681 9.37498 2.29199 9.37498H17.7087Z"
              fill="black"
            />
            <path
              d="M17.7087 3.33331C18.0538 3.33331 18.3337 3.61314 18.3337 3.95831C18.3337 4.30349 18.0538 4.58331 17.7087 4.58331H2.29199C1.94681 4.58331 1.66699 4.30349 1.66699 3.95831C1.66699 3.61314 1.94681 3.33331 2.29199 3.33331H17.7087Z"
              fill="black"
            />
          </svg>
          <h1 className="text-[16px] text-black font-roboto-mono font-medium">
            Other Works
          </h1>
        </button>
        <div className="flex items-center gap-6 ">
          <Link href="/">
            <button className="text-[16px] text-black font-roboto-mono cursor-pointer">
              Home
            </button>
          </Link>
          <button className="flex justify-end text-[16px]">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer"
            >
              <path
                d="M10.7451 19.25C10.7451 19.6642 10.4093 20 9.99512 20C9.5809 20 9.24512 19.6642 9.24512 19.25V17.25C9.24512 16.8358 9.5809 16.5 9.99512 16.5C10.4093 16.5 10.7451 16.8358 10.7451 17.25V19.25Z"
                fill="black"
              />
              <path
                d="M5.40039 14.5928C5.69325 14.8856 5.69325 15.3605 5.40039 15.6533L3.98633 17.0674C3.69347 17.3602 3.21864 17.3602 2.92578 17.0674C2.63292 16.7745 2.63292 16.2997 2.92578 16.0068L4.33984 14.5928C4.63271 14.2999 5.10753 14.2999 5.40039 14.5928Z"
                fill="black"
              />
              <path
                d="M17.0746 16.0064C17.3677 16.2994 17.3676 16.7747 17.0744 17.0677C16.7814 17.3604 16.3066 17.3603 16.0137 17.0674L14.5997 15.6534C14.3068 15.3605 14.3068 14.8856 14.5997 14.5927C14.8925 14.2999 15.3673 14.2998 15.6602 14.5926L17.0746 16.0064Z"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.99512 5C12.7565 5 14.9951 7.23858 14.9951 10C14.9951 12.7614 12.7565 15 9.99512 15C7.23369 15 4.99512 12.7614 4.99512 10C4.99512 7.23858 7.23369 5 9.99512 5ZM9.99512 6.5C8.06212 6.5 6.49512 8.067 6.49512 10C6.49512 11.933 8.06212 13.5 9.99512 13.5C11.9281 13.5 13.4951 11.933 13.4951 10C13.4951 8.067 11.9281 6.5 9.99512 6.5Z"
                fill="black"
              />
              <path
                d="M3.5 9.99512C3.5 10.4093 3.16421 10.7451 2.75 10.7451H0.75C0.335787 10.7451 0 10.4093 0 9.99512C0 9.5809 0.335786 9.24512 0.75 9.24512H2.75C3.16421 9.24512 3.5 9.5809 3.5 9.99512Z"
                fill="black"
              />
              <path
                d="M20 9.99512C20 10.4093 19.6642 10.7451 19.25 10.7451H17.25C16.8358 10.7451 16.5 10.4093 16.5 9.99512C16.5 9.5809 16.8358 9.24512 17.25 9.24512H19.25C19.6642 9.24512 20 9.5809 20 9.99512Z"
                fill="black"
              />
              <path
                d="M5.40723 4.33984C5.70009 4.63271 5.70009 5.10753 5.40723 5.40039C5.11436 5.69325 4.63954 5.69325 4.34668 5.40039L2.93262 3.98633C2.63976 3.69347 2.63976 3.21864 2.93262 2.92578C3.22548 2.63292 3.7003 2.63292 3.99316 2.92578L5.40723 4.33984Z"
                fill="black"
              />
              <path
                d="M17.0674 2.92578C17.3602 3.21864 17.3602 3.69347 17.0674 3.98633L15.6533 5.40039C15.3605 5.69325 14.8856 5.69325 14.5928 5.40039C14.2999 5.10753 14.2999 4.63271 14.5928 4.33984L16.0068 2.92578C16.2997 2.63292 16.7745 2.63292 17.0674 2.92578Z"
                fill="black"
              />
              <path
                d="M10.7451 2.75C10.7451 3.16421 10.4093 3.5 9.99512 3.5C9.5809 3.5 9.24512 3.16421 9.24512 2.75V0.75C9.24512 0.335787 9.5809 0 9.99512 0C10.4093 0 10.7451 0.335786 10.7451 0.75V2.75Z"
                fill="black"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default navbarProductDetail;

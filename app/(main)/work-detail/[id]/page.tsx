"use client";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { ChevronDown, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import MorphText from "@/components/MorphText";
import Headmeta from "@/app/component/headmeta";
import Topic from "@/app/component/topic";
import RichTextDisplay from "@/components/ui/RichTextDisplay";

const Page = () => {
  const params = useParams();
  const id = params?.id as string;

  const [portfolio, setPortfolio] = useState<any>(null);
  const [relatedTopics, setRelatedTopics] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [openIndex, setOpenIndex] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [hoveredDesktopItem, setHoveredDesktopItem] = useState<string | null>(
    null,
  );
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id) return;
    const fetchPortfolio = async () => {
      try {
        const [res, relatedRes] = await Promise.all([
          fetch(`/api/portfolios/${id}`),
          fetch(`/api/portfolios/${id}/related`),
        ]);
        if (!res.ok) throw new Error("Failed to fetch portfolio");
        const data = await res.json();
        setPortfolio(data);

        if (relatedRes.ok) {
          const relatedData = await relatedRes.json();
          setRelatedTopics(relatedData);
        }
        if (data?.contents?.length > 0) {
          setActiveSection(data.contents[0].id);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPortfolio();
  }, [id]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (sentinelRef.current) {
        const top = sentinelRef.current.getBoundingClientRect().top;
        setIsSticky(top <= 0);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!portfolio?.contents) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );

    portfolio.contents.forEach((item: any) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [portfolio]);

  const scrollToSection = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetCount = isMobile ? window.innerHeight * 0.2 : 60;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offsetCount;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      if (isMobile) {
        setOpenIndex(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p className="text-gray-500">Portfolio not found.</p>
      </div>
    );
  }

  const INDEX_DATA = portfolio.contents.map((c: any) => ({
    id: c.id,
    title: c.title,
  }));

  // Cover image: explicitly marked isCover, fallback to first image
  const coverImage =
    portfolio.images.find((img: any) => img.isCover) ??
    portfolio.images[0] ??
    null;

  return (
    <section className="w-full bg-white px-6 md:px-[120px] lg:px-[120px] py-20">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-16">
        <div className="lg:sticky top-0 z-0 h-fit flex flex-col gap-12">
          {/* TITLE */}
          <Headmeta
            title={portfolio.title}
            role={portfolio.role}
            company={portfolio.company}
            year={portfolio.year.toString()}
          />

          {/* index */}
          {INDEX_DATA.length > 0 && (
            <div className="relative z-50">
              {/* Sentinel element to track scroll position */}
              <div ref={sentinelRef} className="absolute -top-px w-full h-px" />

              {/* INVISIBLE PLACEHOLDER to prevent layout shift when fixed on mobile */}
              {isSticky && isMobile && (
                <div className="flex flex-col gap-4 border border-transparent rounded-2xl p-4 opacity-0 pointer-events-none">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[20px] font-medium">Index</h3>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                  <div
                    className={`overflow-hidden ${openIndex ? "max-h-[200px]" : "max-h-[28px]"}`}
                  >
                    <ul className="flex flex-col gap-4 text-[14px] ml-2">
                      {INDEX_DATA.map((item: any) => (
                        <li
                          key={`placeholder-${item.id}`}
                          className={
                            activeSection === item.id || openIndex
                              ? "block"
                              : "hidden"
                          }
                        >
                          {item.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <motion.div
                layout
                className={`flex flex-col gap-4 border-[#C7C8C9] md:p-0 md:bg-transparent md:border-0 md:top-0 md:sticky md:block z-100 ${
                  isSticky && isMobile
                    ? "fixed top-0 left-0 right-0 overflow-y-auto max-h-screen"
                    : "relative border overflow-hidden"
                }`}
                initial={false}
                animate={
                  isSticky && isMobile
                    ? {
                        borderRadius: "0px",
                        borderWidth: "0px",
                        borderBottomWidth: "1px",
                        borderColor: "#E5E7EB",
                        padding: "16px 24px",
                        boxShadow: "0px 10px 40px rgba(0,0,0,0.08)",
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(12px)",
                      }
                    : !isMobile
                      ? {
                          borderRadius: "0px",
                          borderWidth: "0px",
                          padding: "0px",
                          boxShadow: "0px 0px 0px rgba(0,0,0,0)",
                          backgroundColor: "transparent",
                          backdropFilter: "blur(0px)",
                        }
                      : {
                          borderRadius: "16px",
                          border: "1px solid #C7C8C9",
                          padding: "16px",
                          boxShadow: "0px 0px 0px rgba(0,0,0,0)",
                          backgroundColor: "rgba(255, 255, 255, 1)",
                          backdropFilter: "blur(0px)",
                        }
                }
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                <div
                  className="flex items-center justify-between md:block cursor-pointer md:cursor-default"
                  onClick={() => {
                    if (isMobile) {
                      setOpenIndex(!openIndex);
                    }
                  }}
                >
                  <motion.h3
                    layout="position"
                    className="text-[20px] font-semibold text-black mb-2"
                  >
                    Index
                  </motion.h3>

                  <ChevronDown
                    className={`w-5 h-5 text-black transition-transform duration-300 md:hidden ${openIndex ? "rotate-180" : ""}`}
                  />
                </div>

                <motion.div
                  layout="position"
                  className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${openIndex ? "max-h-[300px]" : "max-h-[28px]"}`}
                >
                  <ul className="flex flex-col gap-4 text-[14px] ml-2 top-0 pb-2">
                    {INDEX_DATA.map((item: any, index: number) => {
                      const isActive = activeSection === item.id;
                      const isVisible = isActive || openIndex;
                      return (
                        <li
                          key={`mobile-${item.id}`}
                          className={`${isVisible ? "block" : "hidden"} cursor-pointer transition-colors duration-200 ${
                            isActive
                              ? "text-black font-semibold"
                              : "text-gray-500 hover:text-gray-800"
                          }`}
                          onClick={(e) => scrollToSection(item.id, e)}
                        >
                          {index + 1}. {item.title}
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>

                <div className="hidden md:block">
                  <ul className="flex flex-col gap-4 text-[14px]">
                    {INDEX_DATA.map((item: any, index: number) => {
                      const isHovered = hoveredDesktopItem === item.id;
                      return (
                        <li
                          key={`desktop-${item.id}`}
                          className="ml-1 mt-2 cursor-pointer text-gray-500 hover:text-gray-900 transition-colors duration-200"
                          onClick={(e) => scrollToSection(item.id, e)}
                          onMouseEnter={() => setHoveredDesktopItem(item.id)}
                          onMouseLeave={() => setHoveredDesktopItem(null)}
                        >
                          <div className="flex items-center gap-2">
                            <p>{index + 1}.</p>
                            <MorphText
                              from={item.title}
                              to="Jump to section"
                              trigger={isHovered}
                              tickMs={28}
                              stagger={35}
                              spinCount={5}
                              className={
                                isHovered
                                  ? "font-roboto-mono text-[14px] font-medium underline"
                                  : ""
                              }
                            />
                            <span
                              className={`transition-all duration-300 ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}
                            >
                              <svg
                                width="12"
                                height="14"
                                viewBox="0 0 18 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="shrink-0"
                              >
                                <path
                                  d="M0.75 6.24994L15.4395 6.24994L10.4697 1.28022C10.1768 0.987324 10.1768 0.512563 10.4697 0.21967C10.7626 -0.0732233 11.2374 -0.0732233 11.5303 0.21967L17.7803 6.46967L17.874 6.58393C17.9556 6.70623 18 6.85079 18 6.99994C18 7.19886 17.9209 7.38956 17.7803 7.53022L11.5303 13.7802C11.2374 14.0731 10.7626 14.0731 10.4697 13.7802C10.1768 13.4873 10.1768 13.0126 10.4697 12.7197L15.4395 7.74994L0.75 7.74994C0.335787 7.74994 1.26963e-06 7.41416 0 6.99994C5.40172e-08 6.58573 0.335787 6.24994 0.75 6.24994Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </motion.div>
            </div>
          )}

          {/* related topics */}
          <div className="hidden md:flex ">
            <Topic topics={relatedTopics} />
          </div>
        </div>

        <div className="flex flex-col gap-12">
          {/* {coverImage && (
            <div className="bg-[#F3F3F3] rounded-2xl p-8 md:p-12 flex flex-wrap justify-center items-center gap-10">
              <div
                className="relative w-[140px] md:w-[180px] h-[280px] md:h-[360px] bg-black rounded-[32px] p-[6px] shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
              >
                <div className="w-full h-full bg-white rounded-[28px] overflow-hidden">
                  <img
                    src={coverImage.url}
                    alt={coverImage.altText || "Portfolio Cover"}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          )} */}

          <div className="max-w-[640px] flex flex-col gap-12">
            {portfolio.contents.map((content: any) => {
              const beforeImages = portfolio.images.filter(
                (img: any) =>
                  img.anchorContentId === content.id &&
                  img.anchorPosition === "BEFORE",
              );
              const afterImages = portfolio.images.filter(
                (img: any) =>
                  img.anchorContentId === content.id &&
                  img.anchorPosition === "AFTER",
              );

              return (
                <div
                  id={content.id}
                  key={content.id}
                  className="flex flex-col gap-6 scroll-mt-32"
                >
                  {beforeImages.length > 0 && (
                    <div className="flex flex-col gap-4">
                      {beforeImages.map((img: any) => (
                        <img
                          key={img.id}
                          src={img.url}
                          alt={img.altText || "Before Image"}
                          className="w-full rounded-2xl object-cover"
                        />
                      ))}
                    </div>
                  )}

                  <h2 className="text-[32px] font-semibold text-black">
                    {content.title}
                  </h2>

                  <RichTextDisplay content={content.body} />

                  {afterImages.length > 0 && (
                    <div className="flex flex-col gap-4">
                      {afterImages.map((img: any) => (
                        <img
                          key={img.id}
                          src={img.url}
                          alt={img.altText || "After Image"}
                          className="w-full rounded-2xl object-cover"
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="md:hidden">
            <Topic topics={relatedTopics} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;

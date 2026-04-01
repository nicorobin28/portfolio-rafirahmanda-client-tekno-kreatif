import React from "react";
import Card from "@/app/component/card";
import prisma from "@/lib/prisma";

const page = async () => {
  const portfolios = await prisma.portfolio.findMany({
    include: {
      images: {
        orderBy: { order: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="pb-10">
      <div className="w-full flex flex-col md:flex-row pt-[64px] pb-[64px] px-[20px] md:px-[120px] gap-[24px] ">
        <div className="flex justify-between w-full items-start">
          <p className="text-[40px] md:text-[62px] font-medium font-jakarta text-[#171718]">
            Rafi Rahmanda
          </p>
        </div>

        <div className="flex justify-between items-end h-auto md:h-[77px] font-roboto-mono ">
          <p className="text-[#171718] text-[12px] md:text-[24px]  w-auto md:w-[270px] md:pl-9 font-roboto-mono">
            UI/UX DESIGNER
          </p>
          <p className="text-[#171718] text-[12px] md:text-[24px] w-auto md:w-[270px] font-roboto-mono">
            PHNOM PENH, KH
          </p>
        </div>
      </div>

      <div className="px-4 md:px-[120px]">
        <main className="grid grid-cols-1 md:grid-cols-4 gap-[48px] md:gap-x-6 md:gap-y-12 justify-center">
          {portfolios.map((portfolio: any) => (
            <Card
              key={portfolio.id}
              img={portfolio.images?.[0]?.url || "/home1.png"}
              desc={{
                icon: (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="16" height="16" rx="2" fill="#E5E7EB" />
                    <path d="M4 4h8v8H4V4z" fill="#9CA3AF" />
                  </svg>
                ),
                name: portfolio.company,
                year: portfolio.year.toString(),
              }}
              title={portfolio.title}
              subtitle={portfolio.role}
            />
          ))}
        </main>

        {portfolios.length === 0 && (
          <div className="text-center py-20 text-gray-400 font-jakarta">
            No projects available yet.
          </div>
        )}

        {portfolios.length > 0 && (
          <div className="md:hidden text-center mt-[48px] ">
            <p className="text-[#5B5E61] font-jakarta pb-5 text-[14px]">
              That’s all for now!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;

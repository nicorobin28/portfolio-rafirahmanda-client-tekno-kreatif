import React from "react";

const card = () => {
  type data = {
    id: number;
    img: string;
    desc: {
      icon: React.ReactNode;
      name: string;
      year: string;
    };
    title: string;
    subtitle: string;
  };

  const card: data[] = [
    {
      id: 1,
      img: "gambar",
      desc: {
        icon: (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            // xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <rect width="16" height="16" fill="url(#pattern0_9083_252)" />
            <defs>
              <pattern
                id="pattern0_9083_252"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use
                  //   xlink:href="#image0_9083_252"
                  transform="scale(0.00444444)"
                />
              </pattern>
              <image
                id="image0_9083_252"
                width="225"
                height="225"
                preserveAspectRatio="none"
                // xlink:href="data:image/png;base64,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"
              />
            </defs>
          </svg>
        ),
        name: "cellcard",
        year: "2026",
      },
      title: "Increase Design Team Productivity by 3X ",
      subtitle: "Using libraries, guidelines, and modular journey blocks. ",
    },
  ];

  return (
    <div>
      <main>
        {/* CARD MD-LG */}
        {card.map((item) => (
          <div
            key={item.id}
            className="hidden md:flex flex-col gap-4 max-w-[282px] cursor-pointer group "
          >
            {/* Image */}
            <div className="w-[282px] h-[188px] rounded-[8px] bg-[#F1F1F2] text-red-400">
              {item.img}
            </div>

            {/* Desc */}
            <div className="flex items-center font-roboto-mono gap-2 text-[#5B5E61] text-[12px] px-[4px]">
              <div className="flex items-center gap-1.5">
                {/* Icon */}
                <>{item.desc.icon}</>
                {/* Icon Name */}
                <p>{item.desc.name}</p>
              </div>
              {/* Bullet */}
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
              {/* Year */}
              <p>{item.desc.year}</p>
            </div>

            {/* Title */}
            <div className="text-[#171718] font-jakarta px-[4px] group-hover:underline ">
              <h1 className="font-semibold text-[26px] line-clamp-2">
                {item.title}
              </h1>
            </div>

            {/* Subtitle */}
            <div className="text-[#5B5E61] font-jakarta px-[4px] group-hover:hidden">
              <h1 className="text-[16px] line-clamp-2">{item.subtitle}</h1>
            </div>

            {/* Read More */}
            <div
              className="hidden underline group-hover:flex items-center text-[#171718] 
                    px-[4px] font-roboto-mono font-semibold gap-2 pt-6"
            >
              <h1>Read More</h1>
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
        ))}

        {/* CARD SM (MOBILE) */}
        {card.map((item) => (
          <div
            key={item.id}
            className="md:hidden flex gap-4 max-w-[358px] cursor-pointer group"
          >
            <div className="flex flex-col gap-2 max-w-[234px]">
              {/* Desc */}
              <div className="flex items-center font-roboto-mono gap-2 text-[#5B5E61] text-[12px] px-[4px]">
                <div className="flex items-center gap-1.5">
                  {/* Icon */}
                  <>{item.desc.icon}</>
                  {/* Icon Name */}
                  <p>{item.desc.name}</p>
                </div>
                {/* Bullet */}
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
                {/* Year */}
                <p>{item.desc.year}</p>
              </div>

              {/* Title */}
              <div className="text-[#171718] font-jakarta px-[4px] group-hover:underline ">
                <h1 className="font-semibold text-[20px] line-clamp-2">
                  {item.title}
                </h1>
              </div>

              {/* Subtitle */}
              <div className="text-[#5B5E61] font-jakarta px-[4px] group-hover:hidden">
                <h1 className="text-[16px] line-clamp-2">{item.subtitle}</h1>
              </div>

              {/* Read More */}
              <div
                className="hidden underline group-hover:flex items-center text-[#171718] 
                    px-[4px] font-roboto-mono font-semibold gap-2 pt-6"
              >
                <h1>Read More</h1>
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

            {/* Image */}
            <div className="w-[108px] h-[72px] rounded-[6px] bg-[#F1F1F2] text-red-400">
              {item.img}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default card;

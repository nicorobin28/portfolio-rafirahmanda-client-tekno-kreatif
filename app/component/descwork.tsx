import React from "react";

type Section = {
  id: string;
  title: string;
  content: string[];
};

type Props = {
  sections: Section[];
};

const Descwork = ({ sections }: Props) => {
  return (
    <div className="max-w-[640px] flex flex-col gap-6">
      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          data-section
          className=" flex flex-col gap-6 pt-10 scroll-mt-24"
        >
          <h2 className="text-[32px] font-semibold text-black">
            {section.title}
          </h2>

          {section.content.map((text, i) => (
            <p key={i} className="text-gray-600 leading-relaxed">
              {text}
            </p>
          ))}
        </section>
      ))}
    </div>
  );
};

export default Descwork;

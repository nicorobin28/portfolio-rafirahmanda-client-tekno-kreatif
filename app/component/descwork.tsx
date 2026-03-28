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
    <div className="max-w-[640px] flex flex-col gap-12">
      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="flex flex-col gap-6 scroll-mt-32"
        >
          <h2 className="text-[32px] font-semibold text-black">
            {section.title}
          </h2>

          {section.content.map((text, i) => (
            <p key={i} className="text-gray-600 leading-relaxed">
              {text.split("\n").map((line, idx) => (
                <span key={idx}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          ))}
        </section>
      ))}
    </div>
  );
};

export default Descwork;

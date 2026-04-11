import React from "react";
import DOMPurify from "isomorphic-dompurify";

const DISPLAY_STYLES = `
  .rich-text-content {
    color: rgb(48, 48, 48);
    font-size: 18px;
    line-height: 1.625;
  }

  /* Headings */
  .rich-text-content h1 {
    font-size: 1.875rem;
    font-weight: 700;
    line-height: 1.2;
    margin-top: 1.25rem;
    margin-bottom: 0.75rem;
    color: rgb(48, 48, 48);
  }

  .rich-text-content h2 {
    font-size: 1.375rem;
    font-weight: 600;
    line-height: 1.3;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    color: rgb(48, 48, 48);
  }

  /* Lists */
  .rich-text-content ul {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .rich-text-content ol {
    list-style-type: decimal;
    padding-left: 1.5rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .rich-text-content li {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
  }

  .rich-text-content li > p {
    margin: 0;
  }

  /* Blockquote */
  .rich-text-content blockquote {
    border-left: 3px solid #cbd5e1;
    padding-left: 1rem;
    margin-left: 0;
    color: #64748b;
    font-style: italic;
  }

  /* Paragraphs */
  .rich-text-content p {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
  }

  .rich-text-content p:empty::after {
    content: "\\00A0";
  }
`;

export default function RichTextDisplay({ content }: { content: string }) {
  return (
    <>
      <style>{DISPLAY_STYLES}</style>
      <div
        className="rich-text-content w-full"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(content, { ADD_ATTR: ["style"] }),
        }}
      />
    </>
  );
}

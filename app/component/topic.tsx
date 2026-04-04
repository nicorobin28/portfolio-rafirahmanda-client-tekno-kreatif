import Link from "next/link";
import React from "react";

interface TopicProps {
  topics: { id: string; title: string }[];
}

const Topic: React.FC<TopicProps> = ({ topics }) => {
  if (!topics || topics.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-[18px] font-semibold text-black">Related Topics</h3>
      <ul className="flex flex-col gap-3 text-gray-500 text-[14px]">
        {topics.map((topic) => (
          <li key={topic.id}>
            <Link href={`/work-detail/${topic.id}`} className="hover:text-black hover:underline transition-colors">
              {topic.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Topic;

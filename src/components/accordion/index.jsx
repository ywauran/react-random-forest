import React, { useState } from "react";

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 border border-gray-300 rounded-md">
      <div
        className="flex items-center justify-between p-4 bg-gray-100 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <svg
          className={`w-4 h-4 transition-transform transform ${
            isOpen ? "rotate-0" : "rotate-180"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {isOpen && <div className="p-4 border-t border-gray-300">{children}</div>}
    </div>
  );
};

export default Accordion;

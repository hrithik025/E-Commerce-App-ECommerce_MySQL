import BaseProps from "@/lib/Props/BaseProps";
import classNames from "classnames";
import React from "react";

interface RatingProps extends BaseProps {
  rating: number; // e.g., 4.2 or 4.5
}

export const Rating: React.FC<RatingProps> = (props) => {
  return (
    <div className={classNames("flex space-x-1", props.className)}>
      {Array.from({ length: 5 }, (_, index) => {
        const fillPercentage =
          Math.min(Math.max(props.rating - index, 0), 1) * 100; // Calculate the fill percentage (0 to 100)

        return (
          <div key={index} className="relative w-6 h-6">
            {/* Full Star Outline */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="absolute inset-0 w-full h-full text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              />
            </svg>

            {/* Filled Star */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#FF9900"
              className="absolute inset-0 w-full h-full"
              style={{
                clipPath: `inset(0 ${100 - fillPercentage}% 0 0)`, // Use clip-path to partially fill the star
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
};

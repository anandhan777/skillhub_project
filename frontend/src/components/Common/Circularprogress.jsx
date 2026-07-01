import React, { useState, useEffect } from "react";

const CircularProgress = ({ progress }) => {
  const radius = 50; // circle radius
  const stroke = 12;  // stroke width
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={120} height={120}>
      {/* Background circle */}
      <circle
        stroke="#e5e7eb" // gray-200
        fill="transparent"
        strokeWidth={stroke}
        r={radius}
        cx={60}
        cy={60}
      />
      {/* Progress circle */}
      <circle
        stroke="#3b82f6" // blue-500
        fill="transparent"
        strokeWidth={stroke}
        r={radius}
        cx={60}
        cy={60}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.35s", transform: "rotate(-90deg)",
    transformOrigin: "50% 50%" }}
      />
      {/* Text in center */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        className="text-2xl font-bold fill-blue-500"
      >
        {progress}%
      </text>
    </svg>
  );
};

export default CircularProgress

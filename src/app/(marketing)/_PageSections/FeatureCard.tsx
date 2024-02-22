"use client"

import React, { useState, useEffect } from "react";
import { Tilt } from "react-tilt";
import "../../../styles/globals.css";

interface FeatureCardI {
  heading: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard = ({ heading, description, icon }: FeatureCardI) => {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isHovered) {
        const target = e.target as HTMLElement;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
      }
    };

    const handleMouseOut = () => {
      setMousePosition({ x: null, y: null });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isHovered]);

  useEffect(() => {
    if (isHovered) {
      const styleElement = document.createElement("style");
      styleElement.innerHTML = `
        .hover-effect::before {
          background: radial-gradient(800px at ${mousePosition.x ?? 0}px ${
        mousePosition.y ?? 0
      }px, rgba(255, 255, 255, 0.24), transparent 80%);
          height: 100%;
          left: 0;
          top: 0;
          position: absolute;
          width: 100%;
          border-radius: inherit;
          content: "";
          z-index: 2;
        }
      `;
      document.head.appendChild(styleElement);

      return () => {
        document.head.removeChild(styleElement);
      };
    }
  }, [isHovered, mousePosition.x, mousePosition.y]);

  return (
    <Tilt
      options={{
        reverse: true,
        max: 25,
        perspective: 1000,
        scale: 1.1
      }}
    >
      <div
        className={`rounded-lg border bg-background-light dark:bg-background-dark p-2 ${
          isHovered ? "hover-effect" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex h-[180px] flex-col justify-between p-6">
          <div className="space-y-2">
            {icon}
            <h3 className="font-bold">{heading}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>
    </Tilt>
  );
};

export default FeatureCard;
  
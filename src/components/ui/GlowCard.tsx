"use client";

import { useRef, useState } from "react";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlowCard({ children, className = "" }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setGlowPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative rounded-[var(--radius-card)] p-px overflow-hidden ${className}`}
    >
      {/* Glow border overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-300 rounded-[var(--radius-card)]"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${glowPosition.x}px ${glowPosition.y}px, rgba(255, 107, 0, 0.15), transparent 40%)`,
        }}
      />
      {/* Static border */}
      <div className="absolute inset-0 rounded-[var(--radius-card)] border border-border" />
      {/* Inner content with solid background */}
      <div className="relative bg-bg-card rounded-[calc(var(--radius-card)-1px)] h-full">
        {children}
      </div>
    </div>
  );
}

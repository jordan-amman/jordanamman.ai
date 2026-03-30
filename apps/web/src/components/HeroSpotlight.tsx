"use client";

import { useState } from "react";

type HeroSpotlightProps = {
  children: React.ReactNode;
};

export function HeroSpotlight({ children }: HeroSpotlightProps) {
  const [coords, setCoords] = useState({ x: 50, y: 50 });

  return (
    <section
      className="hero hero-spotlight"
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width) * 100;
        const y = ((event.clientY - bounds.top) / bounds.height) * 100;
        setCoords({ x, y });
      }}
      style={{
        ["--spot-x" as string]: `${coords.x}%`,
        ["--spot-y" as string]: `${coords.y}%`
      }}
    >
      {children}
    </section>
  );
}

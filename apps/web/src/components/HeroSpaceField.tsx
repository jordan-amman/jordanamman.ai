"use client";

import { useEffect, useRef, useState } from "react";

type Particle = {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
};

type HeroSpaceFieldProps = {
  children: React.ReactNode;
};

export function HeroSpaceField({ children }: HeroSpaceFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Initialize particles
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    setDimensions({ width, height });

    // Create particle field
    const particleCount = Math.max(60, Math.min(120, Math.floor((width * height) / 15000)));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 100,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.6 + 0.2
      });
    }

    particlesRef.current = particles;
  }, []);

  // Mouse tracking
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    canvas.width = width;
    canvas.height = height;

    const animate = () => {
      // Clear with slight trail effect
      ctx.fillStyle = "rgba(244, 241, 235, 0.02)";
      ctx.fillRect(0, 0, width, height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      particles.forEach((particle) => {
        // Apply drift and gravity
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Cursor influence - subtle pull towards cursor direction
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 200) {
          const force = (1 - dist / 200) * 0.08;
          particle.vx += (dx / dist) * force;
          particle.vy += (dy / dist) * force;
        }

        // Damping
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        // Wrap edges
        if (particle.x < -10) particle.x = width + 10;
        if (particle.x > width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = height + 10;
        if (particle.y > height + 10) particle.y = -10;

        // Depth-based sizing and opacity
        const depthFactor = 0.5 + (particle.z / 100) * 0.5;
        const displaySize = particle.size * depthFactor;
        const displayOpacity = particle.opacity * depthFactor;

        // Draw particle with depth-based color
        ctx.fillStyle = `rgba(15, 109, 100, ${displayOpacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, displaySize, 0, Math.PI * 2);
        ctx.fill();

        // Subtle glow for closer particles
        if (particle.z > 60) {
          ctx.fillStyle = `rgba(143, 198, 188, ${displayOpacity * 0.3})`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, displaySize * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dimensions]);

  return (
    <section
      ref={containerRef}
      className="hero hero-space-field"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none"
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </section>
  );
}

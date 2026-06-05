"use client";
import React from "react";
import { motion } from "framer-motion";

export type Testimonial = {
  text: string;
  image: string;
  name: string;
  role: string;
};

type AccentColor = "green" | "blue" | "orange";

const ACCENT_MAP: Record<AccentColor, { topBorder: string; nameDot: string }> = {
  green:  { topBorder: "#4ade80", nameDot: "bg-green-400"  },
  blue:   { topBorder: "#60a5fa", nameDot: "bg-blue-400"   },
  orange: { topBorder: "#fb923c", nameDot: "bg-orange-400" },
};

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
  accentColor?: AccentColor;
}) => {
  const accent = ACCENT_MAP[props.accentColor ?? "green"];

  return (
    <div className={props.className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name, role }, i) => (
              <div
                className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg shadow-black/40 max-w-xs w-full overflow-hidden relative"
                key={i}
                style={{ borderTop: `2px solid ${accent.topBorder}33` }}
              >
                {/* Subtle top glow */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(to right, transparent, ${accent.topBorder}60, transparent)` }}
                />
                <p className="text-sm leading-relaxed text-white/70">{text}</p>
                <div className="flex items-center gap-3 mt-5">
                  <img
                    width={40}
                    height={40}
                    src={image}
                    alt={name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${accent.nameDot} opacity-70 shrink-0`} />
                      <div className="text-sm font-medium text-white tracking-tight leading-5">
                        {name}
                      </div>
                    </div>
                    <div className="text-xs leading-5 text-white/40 tracking-tight pl-3">
                      {role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))]}
      </motion.div>
    </div>
  );
};

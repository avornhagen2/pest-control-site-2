"use client";
import { motion } from "framer-motion";
import { CalendarCheck, FlaskConical, ShieldCheck } from "lucide-react";

const STEPS = [
  {
    number: "01",
    Icon: CalendarCheck,
    title: "Book a Free Inspection",
    description:
      "Call us or schedule online in under two minutes. We confirm a same-day or next-day appointment — no waiting weeks for someone to show up.",
    colorText: "text-green-400",
    colorBg: "bg-green-500/10",
    colorBorder: "border-green-500/30",
    badgeBorder: "border-green-500/20",
    badgeText: "text-green-400/70",
    cardBorder: "hover:border-green-500/20",
  },
  {
    number: "02",
    Icon: FlaskConical,
    title: "We Assess & Treat",
    description:
      "A licensed technician inspects every entry point, identifies the infestation, and applies a targeted treatment on the spot. No guesswork, no generic spray.",
    colorText: "text-blue-400",
    colorBg: "bg-blue-500/10",
    colorBorder: "border-blue-500/30",
    badgeBorder: "border-blue-500/20",
    badgeText: "text-blue-400/70",
    cardBorder: "hover:border-blue-500/20",
  },
  {
    number: "03",
    Icon: ShieldCheck,
    title: "Guaranteed Protection",
    description:
      "We follow up to confirm the problem is resolved. If pests return between scheduled visits, we come back at no extra charge — that's our guarantee.",
    colorText: "text-orange-400",
    colorBg: "bg-orange-500/10",
    colorBorder: "border-orange-500/30",
    badgeBorder: "border-orange-500/20",
    badgeText: "text-orange-400/70",
    cardBorder: "hover:border-orange-500/20",
  },
];

export default function HowItWorks() {
  return (
    <div className="border-t border-white/10 py-24 px-6">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 border border-white/20 text-white/50 text-xs uppercase tracking-widest py-1 px-4 rounded-lg mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
            How It Works
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
            Simple. Fast. Effective.
          </h2>
          <p className="mt-4 text-white/50 max-w-md mx-auto text-base leading-relaxed">
            From first call to full protection in as little as 24 hours.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative grid md:grid-cols-3 gap-6">

          {/* Tricolor connector line (desktop only) */}
          <div
            aria-hidden
            className="hidden md:block absolute top-[52px] left-[calc(16.66%+40px)] right-[calc(16.66%+40px)] h-px"
            style={{
              background: "linear-gradient(to right, #4ade80, #60a5fa, #fb923c)",
              opacity: 0.35,
            }}
          />

          {STEPS.map(({ number, Icon, title, description, colorText, colorBg, colorBorder, badgeBorder, badgeText, cardBorder }, i) => (
            <motion.div
              key={number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className={`relative flex flex-col items-center text-center px-6 py-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 ${cardBorder}`}
            >
              {/* Step icon */}
              <div className="relative mb-6">
                <div className={`h-14 w-14 rounded-2xl border ${colorBorder} ${colorBg} flex items-center justify-center`}>
                  <Icon className={`h-6 w-6 ${colorText}`} strokeWidth={1.5} />
                </div>
                <span className={`absolute -top-2 -right-2 text-[10px] font-bold ${badgeText} bg-black border ${badgeBorder} rounded-full h-5 w-5 flex items-center justify-center leading-none`}>
                  {number.slice(1)}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-white mb-3 tracking-tight">
                {title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">
                {description}
              </p>

              {/* Color accent bar at bottom */}
              <div className={`mt-6 w-8 h-0.5 rounded-full ${colorBg} border-0`}
                style={{ background: colorText === 'text-green-400' ? '#4ade80' : colorText === 'text-blue-400' ? '#60a5fa' : '#fb923c', opacity: 0.5 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

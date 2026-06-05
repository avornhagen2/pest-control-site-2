"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    q: "Is the treatment safe for my children and pets?",
    a: "Yes. We use EPA-registered products and follow strict application protocols designed for occupied homes. After treatment, we'll give you a specific re-entry window — typically 30 to 60 minutes — before your family and pets can return to treated areas. We also offer pet- and family-friendly formulations on request.",
  },
  {
    q: "Do I need to leave my home during the treatment?",
    a: "For most standard treatments, you only need to vacate for the duration of the application plus the re-entry window. We'll tell you exactly how long before your appointment. Some specialized treatments like fumigation require a longer absence, and we'll plan that with you well in advance.",
  },
  {
    q: "How long does a treatment take?",
    a: "A standard inspection and initial treatment typically takes 45 to 90 minutes depending on home size and the severity of the infestation. Larger properties or multi-pest treatments may take a bit longer. We'll give you an accurate time estimate when you book.",
  },
  {
    q: "What if the pests come back after treatment?",
    a: "Every plan includes our re-treatment guarantee. If pests return between scheduled visits, we come back at no extra charge. Pest control is an ongoing process — our plans are designed to keep populations suppressed over time, not just address a single outbreak.",
  },
  {
    q: "How often do I need professional pest control?",
    a: "Most homeowners benefit from quarterly visits, which align with seasonal pest activity cycles. High-risk properties or active infestations may start with monthly visits until the problem is under control, then transition to a quarterly maintenance plan. We'll recommend the right cadence after your inspection.",
  },
  {
    q: "Do you offer same-day service?",
    a: "Yes — same-day appointments are available based on technician availability in your area. We prioritize urgent calls involving rodents, stinging insects, and rapid infestations. Call us directly for the fastest response.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes. GuardPest Solutions is fully licensed, bonded, and insured in every state we operate. All technicians hold current state pest control licenses and undergo background checks before employment. We carry general liability and workers' compensation coverage.",
  },
  {
    q: "What is the difference between DIY and professional treatment?",
    a: "Store-bought products treat surfaces; professional treatments target nests, colonies, and entry points. Our technicians use commercial-grade products not available to consumers, combined with integrated pest management techniques that address the root cause rather than just the symptom. DIY methods typically provide 30–40% effectiveness versus 90–95% for professional treatment.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="border border-white/10 rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white/5 hover:bg-white/[0.07] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/50 focus-visible:ring-inset"
      >
        <span className="text-sm font-medium text-white leading-snug">{q}</span>
        <span className="shrink-0 h-6 w-6 rounded-full border border-white/15 flex items-center justify-center">
          {open
            ? <Minus className="h-3 w-3 text-green-400" />
            : <Plus  className="h-3 w-3 text-white/50" />
          }
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 pt-1 text-sm text-white/50 leading-relaxed border-t border-white/10">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  return (
    <div className="border-t border-white/10 py-24 px-6">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 border border-white/20 text-white/50 text-xs uppercase tracking-widest py-1 px-4 rounded-lg mb-5">
            FAQ
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
            Common questions
          </h2>
          <p className="mt-4 text-white/50 text-base leading-relaxed">
            Everything you need to know before booking your first visit.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {FAQS.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

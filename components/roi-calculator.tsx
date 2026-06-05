"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Bug, ShieldAlert, AlertTriangle, Zap,
  Clock, TrendingUp, DollarSign, Shield,
  Calculator, CheckCircle2, ChevronRight, Home,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const HOME_SIZES = [
  { id: "apartment", label: "Apartment",   sub: undefined,              monthly: 49  },
  { id: "small",     label: "Small Home",  sub: "Under 1,500 sq ft",    monthly: 69  },
  { id: "medium",    label: "Medium Home", sub: "1,500 – 3,000 sq ft",  monthly: 89  },
  { id: "large",     label: "Large Home",  sub: "Over 3,000 sq ft",     monthly: 119 },
] as const;

const PESTS = [
  { id: "ants",     label: "Ants & Roaches", Icon: Bug,          riskPerYear: 200,  tip: "food contamination & minor damage"  },
  { id: "termites", label: "Termites",        Icon: ShieldAlert,  riskPerYear: 4500, tip: "avg structural repair cost"         },
  { id: "rodents",  label: "Rodents",         Icon: AlertTriangle,riskPerYear: 1200, tip: "wiring, insulation & food damage"   },
  { id: "bedbugs",  label: "Bed Bugs",        Icon: Zap,          riskPerYear: 2000, tip: "treatment & replacement costs"      },
] as const;

// Professional pest control reduces ~55% more damage than DIY methods
const PRO_DAMAGE_REDUCTION = 0.55;
const HOURS_SAVED_PER_YEAR  = 42; // ~3.5 hrs/mo

// ─── Animated number hook ────────────────────────────────────────────────────

function useAnimatedNumber(target: number, duration = 650) {
  const [display, setDisplay] = useState(target);
  const prevRef = useRef(target);
  const rafRef  = useRef<number>(0);

  useEffect(() => {
    const from  = prevRef.current;
    const start = performance.now();
    cancelAnimationFrame(rafRef.current);

    const tick = (now: number) => {
      const t      = Math.min((now - start) / duration, 1);
      const eased  = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setDisplay(Math.round(from + (target - from) * eased));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
      else prevRef.current = target;
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return display;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ROICalculator() {
  const [homeSize,      setHomeSize]      = useState<string>("medium");
  const [selectedPests, setSelectedPests] = useState<string[]>(["ants"]);
  const [monthlyDIY,    setMonthlyDIY]    = useState(30);

  const plan = HOME_SIZES.find(h => h.id === homeSize)!;
  const guardPestAnnual = plan.monthly * 12;
  const diyAnnual       = monthlyDIY * 12;

  const totalRisk    = PESTS.filter(p => selectedPests.includes(p.id)).reduce((s, p) => s + p.riskPerYear, 0);
  const damageAvoided = Math.round(totalRisk * PRO_DAMAGE_REDUCTION);
  const diyDelta      = Math.max(diyAnnual - guardPestAnnual, 0);
  const totalValue    = diyDelta + damageAvoided;
  const roi           = Math.round((totalValue / guardPestAnnual) * 100);

  const animROI    = useAnimatedNumber(roi);
  const animDamage = useAnimatedNumber(damageAvoided);
  const animDelta  = useAnimatedNumber(diyDelta);
  const animTotal  = useAnimatedNumber(totalValue);

  const togglePest = (id: string) =>
    setSelectedPests(prev =>
      prev.includes(id)
        ? prev.length > 1 ? prev.filter(p => p !== id) : prev
        : [...prev, id]
    );

  const pct = (monthlyDIY / 150) * 100;

  return (
    <div className="border-t border-white/10 py-24 px-6">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 border border-white/20 text-white/50 text-xs uppercase tracking-widest py-1 px-4 rounded-lg mb-5">
            <Calculator className="h-3 w-3" />
            ROI Calculator
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
            Know the true cost of pests
          </h2>
          <p className="mt-4 text-white/50 max-w-lg mx-auto text-base leading-relaxed">
            Compare what you spend on DIY products against what untreated infestations can actually cost you — then see your return on professional protection.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-start">

          {/* ── Left: Inputs ── */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 space-y-10"
          >

            {/* Home size */}
            <div>
              <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/40 mb-4">
                <Home className="h-3.5 w-3.5" /> Your home
              </p>
              <div className="grid grid-cols-2 gap-2">
                {HOME_SIZES.map(size => {
                  const active = homeSize === size.id;
                  return (
                    <button
                      key={size.id}
                      onClick={() => setHomeSize(size.id)}
                      className={`rounded-xl px-4 py-3.5 text-left transition-all duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/50 ${
                        active
                          ? "border-green-500/50 bg-green-500/10"
                          : "border-white/10 bg-white/[0.03] hover:border-white/20"
                      }`}
                    >
                      <div className={`text-sm font-medium ${active ? "text-white" : "text-white/55"}`}>
                        {size.label}
                      </div>
                      {size.sub && (
                        <div className="text-xs text-white/25 mt-0.5">{size.sub}</div>
                      )}
                      <div className={`text-xs mt-1.5 font-semibold ${active ? "text-green-400" : "text-white/25"}`}>
                        ${size.monthly}/mo
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pest types */}
            <div>
              <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/40 mb-4">
                <Bug className="h-3.5 w-3.5" /> Pest concerns
                <span className="ml-auto normal-case text-white/25 text-xs tracking-normal">Select all that apply</span>
              </p>
              <div className="grid grid-cols-2 gap-2">
                {PESTS.map(({ id, label, Icon, riskPerYear, tip }) => {
                  const active = selectedPests.includes(id);
                  return (
                    <button
                      key={id}
                      onClick={() => togglePest(id)}
                      className={`rounded-xl px-4 py-3.5 text-left transition-all duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/50 ${
                        active
                          ? "border-green-500/50 bg-green-500/10"
                          : "border-white/10 bg-white/[0.03] hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <Icon className={`h-3.5 w-3.5 shrink-0 ${active ? "text-green-400" : "text-white/25"}`} />
                        <span className={`text-sm font-medium ${active ? "text-white" : "text-white/55"}`}>
                          {label}
                        </span>
                      </div>
                      <div className="text-xs text-white/25 leading-relaxed">
                        Up to ${riskPerYear.toLocaleString()}/yr — {tip}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Monthly DIY spend */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/40">
                  <DollarSign className="h-3.5 w-3.5" /> Monthly DIY spend
                </p>
                <span className="text-green-400 font-semibold text-sm tabular-nums">
                  ${monthlyDIY}/mo
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={150}
                step={5}
                value={monthlyDIY}
                onChange={e => setMonthlyDIY(Number(e.target.value))}
                className="roi-slider w-full"
                style={{
                  background: `linear-gradient(to right, #4ade80 ${pct}%, rgba(255,255,255,0.1) ${pct}%)`,
                }}
                aria-label="Monthly DIY pest control spending"
              />
              <div className="flex justify-between text-xs text-white/20 mt-2.5">
                <span>$0 — nothing</span>
                <span>$150/mo</span>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Results ── */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex flex-col gap-3"
          >

            {/* ROI headline card */}
            <div className="rounded-2xl border border-green-500/25 bg-green-500/8 p-7 text-center">
              <p className="text-xs uppercase tracking-widest text-green-400/60 mb-2">
                Your annual return
              </p>
              <div className="text-7xl font-bold text-green-400 tabular-nums leading-none">
                {animROI}
                <span className="text-4xl">%</span>
              </div>
              <p className="text-white/30 text-sm mt-3">
                GuardPest plan from ${plan.monthly}/mo · ${guardPestAnnual.toLocaleString()}/yr
              </p>
            </div>

            {/* Stat rows */}
            {([
              {
                Icon: DollarSign,
                label: "DIY cost savings",
                value: `$${animDelta.toLocaleString()}`,
                unit: "/yr",
                note: diyDelta === 0 ? "Increase if you spend more on DIY" : undefined,
              },
              {
                Icon: Shield,
                label: "Damage risk avoided",
                value: `$${animDamage.toLocaleString()}`,
                unit: "/yr",
                note: undefined,
              },
              {
                Icon: Clock,
                label: "Hours reclaimed",
                value: `${HOURS_SAVED_PER_YEAR}`,
                unit: " hrs/yr",
                note: "~3.5 hrs/mo of DIY treatments",
              },
              {
                Icon: TrendingUp,
                label: "Total annual value",
                value: `$${animTotal.toLocaleString()}`,
                unit: "/yr",
                note: undefined,
              },
            ] as const).map(({ Icon, label, value, unit, note }) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 flex items-center gap-4"
              >
                <div className="h-9 w-9 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
                  <Icon className="h-4 w-4 text-green-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/35 uppercase tracking-widest">{label}</p>
                  <p className="text-lg font-bold text-white tabular-nums leading-tight">
                    {value}
                    <span className="text-sm font-normal text-white/35">{unit}</span>
                  </p>
                  {note && <p className="text-xs text-white/25 mt-0.5">{note}</p>}
                </div>
                <CheckCircle2 className="h-4 w-4 text-green-400/70 shrink-0" />
              </div>
            ))}

            <button className="mt-1 w-full rounded-full bg-green-500 px-6 py-4 text-sm font-semibold text-black transition-colors hover:bg-green-400 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400">
              Get Your Free Inspection
              <ChevronRight className="h-4 w-4" />
            </button>
          </motion.div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-white/20 mt-10 max-w-xl mx-auto">
          Estimates use national averages for untreated pest damage costs and DIY treatment effectiveness rates. Individual results will vary based on infestation severity, region, and property type.
        </p>
      </div>
    </div>
  );
}

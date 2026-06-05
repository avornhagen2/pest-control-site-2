import Image from 'next/image';
import { Bug, ShieldCheck, Home, BadgeCheck, Clock, Star, Phone } from 'lucide-react';
import TestimonialsSection from '@/components/testimonials-section';
import ROICalculator from '@/components/roi-calculator';
import HowItWorks from '@/components/how-it-works';
import FAQSection from '@/components/faq-section';

const services = [
  {
    icon: Bug,
    title: 'Ant & Roach Control',
    description:
      'Targeted treatments that eliminate colonies and prevent roaches from breeding in walls, cabinets, and drains.',
    image: '/images/roaches.png',
    accent: '#4ade80',
  },
  {
    icon: ShieldCheck,
    title: 'Rodent Extermination',
    description:
      'Humane trapping, exclusion sealing, and baiting programs that remove mice and rats — and keep them out.',
    image: '/images/mice.png',
    accent: '#60a5fa',
  },
  {
    icon: Home,
    title: 'Termite Treatment',
    description:
      'Protect your home\'s structure with liquid treatments, bait stations, and annual monitoring plans.',
    image: '/images/termites.png',
    accent: '#fb923c',
  },
];

const stats = [
  { icon: BadgeCheck, label: 'Licensed & Insured', value: '100%' },
  { icon: Clock, label: 'Same-Day Service', value: '24hr' },
  { icon: Star, label: 'Customer Rating', value: '4.9' },
  { icon: Phone, label: 'Emergency Line', value: '24/7' },
];

export default function ServicesSection() {
  return (
    <section className="bg-gradient-to-b from-black via-slate-950 to-green-950">
      {/* Stats strip */}
      <div className="border-b border-white/10">
        <div className="mx-auto grid max-w-5xl grid-cols-2 md:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-2 border-r border-white/10 px-6 py-8 last:border-r-0 text-center"
              >
                <Icon className="h-5 w-5 text-green-400" strokeWidth={1.5} />
                <span className="text-3xl font-bold text-white">
                  {stat.value}
                </span>
                <span className="text-xs uppercase tracking-widest text-white/40">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Services grid */}
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-green-400">
            Our Services
          </p>
          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Complete Protection for Your Home
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/50">
            Every infestation is different. Our licensed technicians customize a
            treatment plan built around your home and the pests threatening it.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/8"
              >
                {/* Image */}
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={600}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  {/* Icon badge */}
                  <div
                    className="absolute left-4 bottom-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/20"
                    style={{ backgroundColor: service.accent + '25' }}
                  >
                    <Icon
                      className="h-5 w-5"
                      style={{ color: service.accent }}
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/55">
                    {service.description}
                  </p>
                  <div className="mt-5 flex items-center gap-1.5 text-sm font-medium"
                    style={{ color: service.accent }}>
                    <span>Learn more</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* How It Works */}
      <HowItWorks />

      {/* ROI Calculator */}
      <ROICalculator />

      {/* Testimonials */}
      <div className="border-t border-white/10">
        <TestimonialsSection />
      </div>

      {/* FAQ */}
      <FAQSection />

      {/* CTA section */}
      <div id="cta" className="border-t border-white/10 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full opacity-[0.07]"
            style={{ background: 'radial-gradient(ellipse, #4ade80, transparent 70%)' }} />
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[250px] rounded-full opacity-[0.05]"
            style={{ background: 'radial-gradient(ellipse, #60a5fa, transparent 70%)' }} />
          <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[350px] h-[250px] rounded-full opacity-[0.05]"
            style={{ background: 'radial-gradient(ellipse, #fb923c, transparent 70%)' }} />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-orange-400">
            Act Now
          </p>
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Don&apos;t Let Pests Take Over Your Home
          </h2>
          <p className="mx-auto mb-8 max-w-lg text-base text-white/50">
            Schedule a free inspection today. Our technicians will assess the
            threat and build a custom protection plan — at no cost to you.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <div className="flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2">
              <ShieldCheck className="h-3.5 w-3.5 text-green-400" />
              <span className="text-xs font-medium text-green-300">Free Inspection</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2">
              <Clock className="h-3.5 w-3.5 text-blue-400" />
              <span className="text-xs font-medium text-blue-300">Same-Day Service</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2">
              <BadgeCheck className="h-3.5 w-3.5 text-orange-400" />
              <span className="text-xs font-medium text-orange-300">Satisfaction Guaranteed</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
            <button className="group relative overflow-hidden rounded-full bg-green-500 px-8 py-4 text-sm font-semibold text-black transition-all duration-300 hover:bg-green-400">
              Get Free Inspection
            </button>
            <a
              href="tel:+15551234567"
              className="flex items-center gap-2 text-sm text-white/55 hover:text-white transition-colors duration-200"
            >
              <Phone className="h-4 w-4 text-blue-400 shrink-0" />
              (555) 123-4567
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 py-8 text-center">
        <p className="text-xs text-white/25">
          &copy; 2026 GuardPest Solutions. Licensed, Bonded & Insured.
        </p>
      </div>
    </section>
  );
}

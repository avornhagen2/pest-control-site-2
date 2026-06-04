import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';
import ServicesSection from '@/components/services-section';
import ThreeVideoScrollWrapper from '@/components/three-video-scroll-wrapper';

export default function Home() {
  return (
    <main className="bg-black">
      {/* === Hero: scroll-expansion === */}
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="/images/ants.png"
        bgImageSrc="/images/house.png"
        title="Protect Your Home"
        date="Pest Control Experts"
        scrollToExpand="Scroll to expand"
        textBlend={false}
      >
        {/* Content revealed after media fully expands */}
        <div className="mx-auto max-w-3xl text-center py-8">
          <p className="text-xs uppercase tracking-[0.3em] text-green-400 mb-4">
            GuardPest Solutions
          </p>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            One call. Complete protection.
          </h3>
          <p className="text-lg text-white/60 leading-relaxed mb-8">
            From ants and roaches to termites and rodents, our licensed
            technicians eliminate every pest threatening your home — and keep
            them out for good. Serving the area since 2008.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="rounded-full bg-green-500 px-8 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-green-400">
              Get Free Inspection
            </button>
            <button className="rounded-full border border-white/25 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              View Services
            </button>
          </div>
        </div>
      </ScrollExpandMedia>

      {/* === Three.js scroll-driven video animation === */}
      <ThreeVideoScrollWrapper />

      {/* === Services + CTA === */}
      <ServicesSection />
    </main>
  );
}

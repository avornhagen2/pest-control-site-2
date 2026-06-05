'use client';

const NAV_ITEMS = [
  { label: 'Our Story', id: 'story' },
  { label: 'Services', id: 'services' },
  { label: 'How It Works', id: 'how-it-works' },
  { label: 'ROI', id: 'roi' },
  { label: 'Testimonials', id: 'testimonials' },
  { label: 'FAQ', id: 'faq' },
];

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: 'smooth' });
}

export default function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <button
          onClick={() => scrollTo('hero')}
          className="text-sm font-semibold text-white hover:text-green-400 transition-colors duration-200"
        >
          GuardPest Solutions
        </button>

        <nav className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors duration-200"
            >
              {label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => scrollTo('cta')}
          className="rounded-full bg-green-500 px-5 py-2 text-xs font-semibold text-black transition-colors duration-200 hover:bg-green-400"
        >
          Free Inspection
        </button>
      </div>
    </header>
  );
}

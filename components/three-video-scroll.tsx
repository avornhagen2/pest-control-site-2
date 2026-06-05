'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Video clip data — drives which frames are drawn
const SEGMENTS = [
  { slug: 'house-to-ants-upscaled-deblurred',   frameCount: 76 },
  { slug: 'ants-to-roaches-upscaled-deblurred',  frameCount: 76 },
  { slug: 'roaches-to-mice-upscaled-deblurred',  frameCount: 76 },
];

// Text card data — threshold is the totalProgress (0–1) at which the card appears
const CARDS = [
  {
    heading:    'Your Home. Their Target.',
    subheading: 'Pests are patient. They find every weakness. We find them first.',
    tag:        'GuardPest Solutions',
    color:      '#94a3b8',
    threshold:  0,
  },
  {
    heading:    'The Invasion Begins',
    subheading: 'Ants find their way into every crack and corner of your home.',
    tag:        'Ant Control',
    color:      '#5CFF8A',
    threshold:  1 / 6,   // halfway through clip 1
  },
  {
    heading:    'Roaches Follow Close Behind',
    subheading: 'Where ants lead, roaches breed — multiplying in the dark.',
    tag:        'Roach Elimination',
    color:      '#fb923c',
    threshold:  1 / 2,   // halfway through clip 2
  },
  {
    heading:    'Then Mice Move In',
    subheading: 'Rodents chew through wiring, walls, and your peace of mind.',
    tag:        'Rodent Control',
    color:      '#60a5fa',
    threshold:  5 / 6,   // halfway through clip 3
  },
];

const TOTAL_FRAMES = SEGMENTS.reduce((sum, s) => sum + s.frameCount, 0);

export default function ThreeVideoScroll() {
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const framesRef   = useRef<HTMLImageElement[][]>([]);
  const loadedRef   = useRef(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isLoaded,       setIsLoaded]         = useState(false);
  const [loadProgress,   setLoadProgress]     = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w   = canvas.offsetWidth;
      const h   = canvas.offsetHeight;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();

    const drawFrame = (img: HTMLImageElement) => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const imgAspect    = img.naturalWidth / img.naturalHeight;
      const canvasAspect = w / h;
      let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
      if (imgAspect > canvasAspect) {
        sw = sh * canvasAspect;
        sx = (img.naturalWidth - sw) / 2;
      } else {
        sh = sw / canvasAspect;
        sy = (img.naturalHeight - sh) / 2;
      }
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
    };

    let loadedCount = 0;
    const allFrames: HTMLImageElement[][] = SEGMENTS.map(() => []);
    framesRef.current = allFrames;

    SEGMENTS.forEach((seg, segIdx) => {
      for (let i = 1; i <= seg.frameCount; i++) {
        const img = new Image();
        img.src = `/frames/${seg.slug}/frame-${String(i).padStart(4, '0')}.webp`;
        img.onload = () => {
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
          if (loadedCount === TOTAL_FRAMES) {
            loadedRef.current = true;
            setIsLoaded(true);
            drawFrame(allFrames[0][0]);
          }
        };
        allFrames[segIdx].push(img);
      }
    });

    let currentSegIdx  = 0;
    let currentCardIdx = 0;

    const onScroll = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper || !loadedRef.current) return;

      const rect        = wrapper.getBoundingClientRect();
      const scrollRoom  = wrapper.offsetHeight - window.innerHeight;
      const scrolled    = Math.max(0, -rect.top);
      const totalProgress = Math.min(1, scrolled / scrollRoom);

      // ── Frames: which segment + which frame within it ──────────────────
      const n      = SEGMENTS.length;
      const raw    = totalProgress * n;
      const segIdx = Math.min(Math.floor(raw), n - 1);
      const segProg = Math.min(raw - segIdx, 1);

      if (segIdx !== currentSegIdx) currentSegIdx = segIdx;

      const frames = allFrames[segIdx];
      if (frames?.length) {
        const frameIdx = Math.min(Math.floor(segProg * frames.length), frames.length - 1);
        const img = frames[frameIdx];
        if (img?.complete) drawFrame(img);
      }

      // ── Cards: pick the last card whose threshold we've passed ──────────
      let newCardIdx = 0;
      for (let i = CARDS.length - 1; i >= 0; i--) {
        if (totalProgress >= CARDS[i].threshold) { newCardIdx = i; break; }
      }
      if (newCardIdx !== currentCardIdx) {
        currentCardIdx = newCardIdx;
        setActiveCardIndex(newCardIdx);
      }
    };

    const onResize = () => { setSize(); onScroll(); };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const card = CARDS[activeCardIndex];

  return (
    <div ref={wrapperRef} style={{ height: '1200vh' }} className="relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Cinematic gradient overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10" />

        {/* Loading screen */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="flex flex-col items-center gap-4">
              <div
                className="h-12 w-12 animate-spin rounded-full border-2 border-t-transparent"
                style={{ borderColor: '#5CFF8A', borderTopColor: 'transparent' }}
              />
              <p className="text-sm text-[#F4F7F2]/50" style={{ fontFamily: 'var(--font-inter)' }}>
                Loading animation... {loadProgress}%
              </p>
            </div>
          </div>
        )}

        {/* Top label */}
        <div className="pointer-events-none absolute left-0 right-0 top-8 flex justify-center">
          <div className="rounded-full border border-white/15 bg-black/40 px-5 py-2 backdrop-blur-md">
            <p className="text-xs uppercase tracking-[0.3em] text-[#F4F7F2]/50" style={{ fontFamily: 'var(--font-inter)' }}>
              Scroll to See the Story
            </p>
          </div>
        </div>

        {/* Text overlay */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 pb-16 px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCardIndex}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="mx-auto max-w-2xl text-center"
            >
              <div
                className="mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
                style={{
                  fontFamily:      'var(--font-inter)',
                  color:           card.color,
                  borderColor:     card.color + '55',
                  backgroundColor: card.color + '18',
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: card.color }} />
                {card.tag}
              </div>
              <h2
                className="mb-4 text-4xl leading-tight tracking-tight md:text-6xl"
                style={{
                  fontFamily:  'var(--font-sora)',
                  fontWeight:  800,
                  color:       '#F4F7F2',
                  textShadow:  '0 2px 16px rgba(0,0,0,0.35)',
                }}
              >
                {card.heading}
              </h2>
              <p
                className="mx-auto max-w-md text-base leading-relaxed md:text-lg"
                style={{ color: '#F4F7F2', opacity: 0.65, fontFamily: 'var(--font-inter)' }}
              >
                {card.subheading}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Progress dots — one per card */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {CARDS.map((c, i) => (
              <motion.div
                key={i}
                className="rounded-full"
                animate={{
                  width:           i === activeCardIndex ? 28 : 6,
                  backgroundColor: i === activeCardIndex ? c.color : 'rgba(255,255,255,0.25)',
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                style={{ height: 4 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

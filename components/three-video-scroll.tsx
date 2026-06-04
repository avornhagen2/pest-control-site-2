'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const SEGMENTS = [
  {
    src: '/video/house-to-ants.mp4',
    heading: 'The Invasion Begins',
    subheading:
      'Ants find their way into every crack and corner of your home.',
    tag: 'Ant Control',
    color: '#4ade80',
  },
  {
    src: '/video/ants-to-roaches.mp4',
    heading: 'Roaches Follow Close Behind',
    subheading: 'Where ants lead, roaches breed — multiplying in the dark.',
    tag: 'Roach Elimination',
    color: '#fb923c',
  },
  {
    src: '/video/roaches-to-mice.mp4',
    heading: 'Then Mice Move In',
    subheading:
      'Rodents chew through wiring, walls, and your peace of mind.',
    tag: 'Rodent Control',
    color: '#60a5fa',
  },
];

export default function ThreeVideoScroll() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.domElement.style.cssText =
      'position:absolute;inset:0;width:100%;height:100%;';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 2;

    // Compute plane dimensions to fill the viewport exactly
    const vFovRad = THREE.MathUtils.degToRad(camera.fov);
    const planeH = 2 * Math.tan(vFovRad / 2) * camera.position.z;
    const planeW = planeH * camera.aspect;

    const geometry = new THREE.PlaneGeometry(planeW, planeH);

    const videoEls: HTMLVideoElement[] = SEGMENTS.map((seg) => {
      const v = document.createElement('video');
      v.src = seg.src;
      v.muted = true;
      v.playsInline = true;
      v.preload = 'auto';
      v.crossOrigin = 'anonymous';
      return v;
    });

    const textures = videoEls.map((v) => {
      const t = new THREE.VideoTexture(v);
      t.colorSpace = THREE.SRGBColorSpace;
      t.minFilter = THREE.LinearFilter;
      t.magFilter = THREE.LinearFilter;
      t.generateMipmaps = false;
      return t;
    });

    const material = new THREE.MeshBasicMaterial({ map: textures[0] });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    let currentIdx = 0;
    let animId = 0;
    let loadedCount = 0;

    const primeVideo = (video: HTMLVideoElement) => {
      const tryPrime = () => {
        video
          .play()
          .then(() => {
            video.pause();
            video.currentTime = 0;
          })
          .catch(() => {})
          .finally(() => {
            loadedCount++;
            if (loadedCount === videoEls.length) setIsLoaded(true);
          });
      };
      if (video.readyState >= 1) {
        tryPrime();
      } else {
        video.addEventListener('loadedmetadata', tryPrime, { once: true });
        video.load();
      }
    };

    videoEls.forEach(primeVideo);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      textures[currentIdx].needsUpdate = true;
      renderer.render(scene, camera);
    };
    animate();

    const onScroll = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const rect = wrapper.getBoundingClientRect();
      const scrollRoom = wrapper.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const totalProgress = Math.max(0, Math.min(1, scrolled / scrollRoom));

      const n = SEGMENTS.length;
      const raw = totalProgress * n;
      const idx = Math.min(Math.floor(raw), n - 1);
      const segProg = idx < n - 1 ? raw - idx : 1;

      if (idx !== currentIdx) {
        currentIdx = idx;
        material.map = textures[idx];
        material.needsUpdate = true;
        setActiveIndex(idx);
      }

      const video = videoEls[idx];
      if (video.readyState >= 2 && video.duration) {
        const target = segProg * video.duration;
        if (Math.abs(video.currentTime - target) > 1 / 30) {
          video.currentTime = target;
        }
      }

      // Subtle 3D tilt: tilts right at start of segment, flat at center, left at end
      plane.rotation.y = (0.5 - segProg) * 0.18;
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      videoEls.forEach((v) => {
        v.pause();
        v.src = '';
      });
      textures.forEach((t) => t.dispose());
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const seg = SEGMENTS[activeIndex];

  return (
    <div ref={wrapperRef} style={{ height: '400vh' }} className="relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* Three.js mount point */}
        <div ref={containerRef} className="absolute inset-0" />

        {/* Cinematic gradient overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/85" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />

        {/* Loading screen */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="flex flex-col items-center gap-4">
              <div className="h-12 w-12 animate-spin rounded-full border-2 border-green-400 border-t-transparent" />
              <p className="text-sm text-white/50">Loading animation...</p>
            </div>
          </div>
        )}

        {/* Top label */}
        <div className="pointer-events-none absolute left-0 right-0 top-8 flex justify-center">
          <div className="rounded-full border border-white/15 bg-black/40 px-5 py-2 backdrop-blur-md">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              Scroll to See the Story
            </p>
          </div>
        </div>

        {/* Text overlay — transitions on segment change */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 pb-16 px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="mx-auto max-w-2xl text-center"
            >
              <div
                className="mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
                style={{
                  color: seg.color,
                  borderColor: seg.color + '55',
                  backgroundColor: seg.color + '18',
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: seg.color }}
                />
                {seg.tag}
              </div>
              <h2 className="mb-4 text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">
                {seg.heading}
              </h2>
              <p className="mx-auto max-w-md text-base leading-relaxed text-white/60 md:text-lg">
                {seg.subheading}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Segment progress indicators */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {SEGMENTS.map((s, i) => (
              <motion.div
                key={i}
                className="rounded-full"
                animate={{
                  width: i === activeIndex ? 28 : 6,
                  backgroundColor:
                    i === activeIndex
                      ? SEGMENTS[activeIndex].color
                      : 'rgba(255,255,255,0.25)',
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

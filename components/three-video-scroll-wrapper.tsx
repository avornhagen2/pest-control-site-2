'use client';

import dynamic from 'next/dynamic';

const ThreeVideoScroll = dynamic(
  () => import('@/components/three-video-scroll'),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen w-full items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-2 border-green-400 border-t-transparent" />
          <p className="text-sm text-white/50">Loading animation...</p>
        </div>
      </div>
    ),
  }
);

export default function ThreeVideoScrollWrapper() {
  return <ThreeVideoScroll />;
}

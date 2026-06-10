"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { VideoLightbox } from "@/components/ui/VideoLightbox";

type VideoItem = { id: string; title: string; thumb: string; src: string };

/** Grid of video tiles, each fronted by the signature green play control. */
export function VideoGrid({ videos }: { videos: VideoItem[] }) {
  const [active, setActive] = useState<VideoItem | null>(null);

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setActive(v)}
            className="group flex flex-col gap-3 rounded-card bg-surface p-4 text-left transition-all duration-300 ease-out-soft hover:bg-surface-2 hover:shadow-card"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-card-sm shadow-card">
              <Image
                src={v.thumb}
                alt={v.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div aria-hidden className="absolute inset-0 bg-bg/30" />
              <span
                aria-hidden
                className="absolute left-1/2 top-1/2 inline-flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-on-accent shadow-card transition-all duration-300 ease-out-soft group-hover:scale-[1.06] group-hover:shadow-glow"
              >
                <Play size={24} strokeWidth={2.5} className="translate-x-px fill-on-accent" />
              </span>
            </div>
            <h3 className="text-base font-bold text-text-bright">{v.title}</h3>
          </button>
        ))}
      </div>

      <VideoLightbox
        open={active !== null}
        onClose={() => setActive(null)}
        src={active?.src}
        title={active?.title}
      />
    </>
  );
}

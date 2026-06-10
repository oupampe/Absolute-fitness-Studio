"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PlayControl } from "@/components/ui/PlayControl";
import { VideoLightbox } from "@/components/ui/VideoLightbox";

/** Video feature with the large signature play control (PROMPT §3.1.5). */
export function VideoFeature() {
  const [open, setOpen] = useState(false);

  return (
    <section className="py-20">
      <Container>
        <div className="relative overflow-hidden rounded-card shadow-card">
          <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
            <Image
              src="https://images.unsplash.com/photo-1571388208497-71bedc66e932?auto=format&fit=crop&w=1600&q=80"
              alt="Inside Absolute Fitness Studio"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/40 to-bg/20" />

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 text-center">
              <span className="eyebrow">Watch Now</span>
              <PlayControl
                size="xl"
                icon="play"
                label="Play the studio walkthrough video"
                onClick={() => setOpen(true)}
              />
              <p className="max-w-md px-6 text-base font-bold text-text-bright sm:text-lg">
                Take a two-minute walk through the studio.
              </p>
            </div>
          </div>
        </div>
      </Container>

      <VideoLightbox open={open} onClose={() => setOpen(false)} />
    </section>
  );
}

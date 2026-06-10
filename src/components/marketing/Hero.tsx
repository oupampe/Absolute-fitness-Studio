"use client";

import { useState } from "react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { PlayControl } from "@/components/ui/PlayControl";
import { VideoLightbox } from "@/components/ui/VideoLightbox";
import { Container } from "@/components/ui/Container";

/**
 * Home hero (PROMPT §3.1) — split layout on near-black. The photo carries the
 * colour; the UI stays achromatic apart from the green CTA + signature play
 * control. Subtle gradient keeps text legible over the image.
 */
export function Hero() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="relative overflow-hidden">
      {/* Ambient green glow, very low opacity — depth without colouring the UI */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[120px]"
      />

      <Container className="relative grid items-center gap-10 py-16 md:grid-cols-2 md:py-24 lg:gap-16">
        {/* Left — copy */}
        <div className="flex flex-col items-start gap-6">
          <span className="eyebrow">Lawley · South Africa</span>

          <h1 className="text-hero font-bold uppercase tracking-tight text-text-bright">
            Fitness
            <br />
            for <span className="text-accent">all</span>
          </h1>

          <p className="max-w-md text-base leading-relaxed text-text-muted sm:text-lg">
            Join us at Absolute Fitness Studio, where health meets community. Tailored fitness
            solutions for busy lifestyles.
          </p>

          <div className="mt-2 flex items-center gap-5">
            <ButtonLink href="/signup" variant="primary" size="lg">
              Join Now
            </ButtonLink>

            <div className="flex items-center gap-3">
              <PlayControl
                size="lg"
                icon="play"
                label="Play the studio intro video"
                onClick={() => setVideoOpen(true)}
              />
              <span className="label-voice text-text-muted">Watch intro</span>
            </div>
          </div>
        </div>

        {/* Right — photo (carries the colour) */}
        <div className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card shadow-card sm:aspect-[5/5] md:aspect-[4/5]">
            <Image
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1100&q=80"
              alt="Athlete training at Absolute Fitness Studio"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            {/* Legibility gradient */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-bg/70 via-bg/10 to-transparent"
            />
            {/* Floating play control intentionally removed — to be re-added later. */}
          </div>
        </div>
      </Container>

      <VideoLightbox
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        src="/videos/intro-video.mp4"
        kind="file"
        title="Absolute Fitness Studio — intro"
        widthClass="max-w-md"
      />
    </section>
  );
}

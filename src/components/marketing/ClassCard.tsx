"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";
import type { PlanInfo } from "@/lib/plans";
import { CLASS_COVERS, CLASS_VIDEOS } from "@/lib/media";
import { VideoLightbox } from "@/components/ui/VideoLightbox";
import { cn } from "@/lib/utils";

/**
 * Album-style class tile. The card body links into the subscribe / payment
 * flow. The circular green control is the signature motif: for classes with a
 * preview video it plays the clip; otherwise it's a press-to-book shortcut.
 */
export function ClassCard({ plan, className }: { plan: PlanInfo; className?: string }) {
  const [videoOpen, setVideoOpen] = useState(false);
  const cover = plan.key !== "NONE" ? CLASS_COVERS[plan.key] : undefined;
  const video = plan.key !== "NONE" ? CLASS_VIDEOS[plan.key] : undefined;
  const href = `/dashboard/subscribe?plan=${plan.key}`;

  return (
    <article
      className={cn(
        "group relative flex flex-col gap-4 rounded-card bg-surface p-4 transition-all duration-300 ease-out-soft hover:bg-surface-2 hover:shadow-card",
        className,
      )}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-card-sm shadow-card">
        {cover ? (
          <Image
            src={cover}
            alt={plan.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}

        {video ? (
          // Press-to-play preview clip — always visible, opens the lightbox.
          <button
            type="button"
            onClick={() => setVideoOpen(true)}
            aria-label={`Play the ${plan.name} preview video`}
            className="absolute bottom-3 right-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-on-accent shadow-card transition-all duration-300 ease-out-soft hover:scale-[1.06] hover:bg-accent-strong hover:shadow-glow"
          >
            <Play size={20} strokeWidth={2.5} className="translate-x-px fill-on-accent" />
          </button>
        ) : (
          // Press-to-book — slides up + fades in on hover.
          <Link
            href={href}
            aria-label={`Book ${plan.name}`}
            className="absolute bottom-3 right-3 inline-flex h-12 w-12 translate-y-2 items-center justify-center rounded-full bg-accent text-on-accent opacity-0 shadow-card transition-all duration-300 ease-out-soft group-hover:translate-y-0 group-hover:opacity-100 group-hover:shadow-glow"
          >
            <Play size={20} strokeWidth={2.5} className="translate-x-px fill-on-accent" />
          </Link>
        )}
      </div>

      <Link href={href} className="flex flex-1 flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-base font-bold text-text-bright">{plan.name}</h3>
          <span className="shrink-0 text-sm font-bold text-accent">{plan.priceLabel}</span>
        </div>
        <p className="text-xs uppercase tracking-label text-text-muted">{plan.pace}</p>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-text-muted">{plan.blurb}</p>
        <span className="mt-3 label-voice text-text-muted transition-colors group-hover:text-accent">
          {plan.cta} →
        </span>
      </Link>

      {video ? (
        <VideoLightbox
          open={videoOpen}
          onClose={() => setVideoOpen(false)}
          src={video}
          kind="file"
          title={`${plan.name} — preview`}
          widthClass="max-w-xs"
        />
      ) : null}
    </article>
  );
}

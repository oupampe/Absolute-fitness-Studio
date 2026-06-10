"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Modal video player fronted by the signature green play control.
 *
 * - kind="embed" (default): plays a YouTube/Vimeo embed URL in a 16:9 iframe.
 * - kind="file": plays a self-hosted video (mp4) via a native <video>. The modal
 *   is sized to `widthClass` and the video is never upscaled past its box, so
 *   small/low-res clips stay crisp instead of pixelating.
 */
export function VideoLightbox({
  open,
  onClose,
  src = "https://www.youtube.com/embed/dQw4w9WgXcQ",
  title = "Absolute Fitness Studio — intro",
  kind = "embed",
  widthClass = "max-w-4xl",
}: {
  open: boolean;
  onClose: () => void;
  src?: string;
  title?: string;
  kind?: "embed" | "file";
  widthClass?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[80] flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className={cn("relative z-10 w-full", widthClass)}>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-12 right-0 inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface-2 text-text transition hover:bg-card"
        >
          <X size={20} />
        </button>

        {kind === "file" ? (
          <video
            src={src}
            title={title}
            controls
            autoPlay
            playsInline
            className="mx-auto block max-h-[80vh] w-full rounded-card bg-black object-contain shadow-dialog"
          />
        ) : (
          <div className="aspect-video w-full overflow-hidden rounded-card shadow-dialog">
            <iframe
              src={src}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full border-0"
            />
          </div>
        )}
      </div>
    </div>
  );
}

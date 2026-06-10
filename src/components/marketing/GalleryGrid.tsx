"use client";

import { useState } from "react";
import Image from "next/image";
import { GALLERY } from "@/lib/media";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/** Responsive masonry-style gallery with progressive "Load More". */
export function GalleryGrid({ initial = 6 }: { initial?: number }) {
  const [count, setCount] = useState(initial);
  const visible = GALLERY.slice(0, count);
  const hasMore = count < GALLERY.length;

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="grid w-full auto-rows-[180px] grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {visible.map((img, i) => (
          <div
            key={img.src}
            className={cn(
              "group relative overflow-hidden rounded-card-sm bg-surface shadow-card",
              img.span === "tall" && "row-span-2",
              img.span === "wide" && "col-span-2",
            )}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority={i < 2}
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-bg/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
            />
          </div>
        ))}
      </div>

      {hasMore ? (
        <Button variant="outline" size="md" onClick={() => setCount((c) => c + 4)}>
          Load More
        </Button>
      ) : null}
    </div>
  );
}

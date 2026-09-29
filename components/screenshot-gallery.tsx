"use client";

import { useEffect, useRef, useState } from "react";
import type { ProjectImage } from "@/data/projects";

export function ScreenshotGallery({ images }: { images: ProjectImage[] }) {
  const viewport = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    const slide = viewport.current?.children[active] as HTMLElement | undefined;
    if (!slide) return;
    const observer = new ResizeObserver(() => setHeight(slide.getBoundingClientRect().height + 2));
    observer.observe(slide);
    return () => observer.disconnect();
  }, [active, images]);

  function goTo(index: number) {
    const container = viewport.current;
    const slide = container?.children[index] as HTMLElement | undefined;
    if (!container || !slide) return;
    container.scrollTo({
      left: slide.offsetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  return <div role="region" aria-roledescription="캐러셀" aria-label="기능 구현 스크린샷">
    <div
      ref={viewport}
      tabIndex={images.length > 1 ? 0 : undefined}
      aria-label="스크린샷 목록. 좌우 방향키 또는 스와이프로 이동"
      style={{ height }}
      className="relative flex items-start snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain rounded-card border border-border bg-surface [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      onScroll={() => {
        const container = viewport.current;
        if (!container) return;
        const slides = Array.from(container.children) as HTMLElement[];
        const nearest = slides.reduce((best, slide, index) =>
          Math.abs(slide.offsetLeft - container.scrollLeft) < Math.abs(slides[best].offsetLeft - container.scrollLeft) ? index : best, 0);
        setActive(nearest);
      }}
      onKeyDown={(event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        goTo(Math.max(0, Math.min(images.length - 1, active + (event.key === "ArrowRight" ? 1 : -1))));
      }}
    >
      {images.map((image, index) => <figure key={`${image.src}-${index}`} role="group" aria-roledescription="슬라이드" aria-label={`${index + 1} / ${images.length}`} className="m-0 w-full min-w-0 shrink-0 snap-start snap-always">
        <div className="bg-background">
          {/* Dimensions vary by screenshot; preserve the image's intrinsic aspect ratio. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image.src} alt={image.alt} loading="lazy" decoding="async" className="block h-auto w-full" />
        </div>
        {(image.label?.trim() || image.caption?.trim()) && <figcaption className="flex flex-col gap-1 border-t border-border px-5 py-4 text-sm leading-7 sm:flex-row sm:items-baseline sm:gap-5 sm:px-6">
          {image.label?.trim() && <span className="shrink-0 font-semibold text-accent-readable sm:max-w-[40%]">{image.label}</span>}
          {image.caption?.trim() && <span className="min-w-0 text-text-secondary">{image.caption}</span>}
        </figcaption>}
      </figure>)}
    </div>
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
      <p aria-live="polite" aria-atomic="true" className="font-mono text-xs text-text-secondary"><span className="text-accent-readable">{String(active + 1).padStart(2, "0")}</span> / {String(images.length).padStart(2, "0")}</p>
      {images.length > 1 && <div className="flex items-center gap-2">
        <button type="button" className="button-secondary px-4 text-sm" disabled={active === 0} onClick={() => goTo(active - 1)} aria-label="이전 스크린샷"><span aria-hidden="true">←</span></button>
        <button type="button" className="button-secondary px-4 text-sm" disabled={active === images.length - 1} onClick={() => goTo(active + 1)} aria-label="다음 스크린샷"><span aria-hidden="true">→</span></button>
      </div>}
    </div>
  </div>;
}

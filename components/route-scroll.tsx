"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

// Page links opt out of Next's scroll heuristic. Hash links keep native behavior.
export function RouteScroll() {
  const pathname = usePathname();
  useLayoutEffect(() => {
    if (window.location.hash) return;
    const reset = () => window.scrollTo({ top: 0, behavior: "instant" });
    reset();
    // Finish after the new route commits, including any pending keyboard focus scroll.
    const frame = requestAnimationFrame(reset);
    return () => cancelAnimationFrame(frame);
  }, [pathname]);
  return null;
}

"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(max-width: 767px)";

function subscribe(callback: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

/**
 * iOS Safari intermittently re-renders composited elements in their
 * animation end-state while scrolling ("cards and text flicker") — a
 * long-standing WebKit bug with opacity/transform keyframes that run
 * mid-scroll. The industry fix is to not run timed entrance animations
 * on mobile at all: keep the in-view trigger, drop the animation window
 * (duration 0, opacity-only). Server snapshot is false (desktop HTML),
 * which matches today's SSR output — no hydration delta.
 */
export function useInstantEntrance(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}

export const INSTANT_TRANSITION = { duration: 0 } as const;

import { useEffect, useState } from 'react';

/**
 * Recharts replays its entry animation every time a chart re-renders at a new
 * container size (e.g. after the sidebar collapses or the window resizes).
 * Keep the animation on only for the initial mount window, then switch it off
 * so later resizes redraw instantly.
 */
export function useChartAnimation(durationMs = 1600): boolean {
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setAnimate(false), durationMs + 200);
    return () => window.clearTimeout(timer);
  }, [durationMs]);

  return animate;
}

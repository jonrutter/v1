/**
 * Adapted from Brittany Chiang's useScrollDirection() custom hook
 * (https://github.com/bchiang7/v4/blob/main/src/hooks/useScrollDirection.js),
 * original code (c) 2018 Brittany Chiang, licensed under the MIT License (https://github.com/bchiang7/v4/blob/main/LICENSE)
 * My modifications:
 * - add code for determining whether the user has scrolled
 * - modify return type to a memoized object including both scroll direction and scrolled boolean
 * - convert to TypeScript & add type definitions
 */

import { useState, useEffect, useMemo } from 'react';

type Direction = 'up' | 'down';

type Props = {
  initialDirection: Direction;
  thresholdPixels: number;
  off: boolean;
};

type ScrollInformation = {
  scrollDir: Direction;
  scrolled: boolean;
};

const defaultProps = {
  initialDirection: 'up' as Direction,
  thresholdPixels: 0,
  off: false,
};

export const useScroll = ({
  initialDirection,
  thresholdPixels,
  off,
}: Props = defaultProps): ScrollInformation => {
  const [scrollDir, setScrollDir] = useState<Direction>(initialDirection);
  const [scrolled, setScrolled] = useState(window.scrollY > 20);

  useEffect(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    const threshold = thresholdPixels || 0;
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScroll = () => {
      const scrollY = window.scrollY;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        // We haven't exceeded the threshold
        ticking = false;
        return;
      }

      // set scrolled to true if the scroll position is greater than 20px
      if (scrollY > 20) setScrolled(true);
      else setScrolled(false);

      // updating the scrolled direction
      setScrollDir(scrollY > lastScrollY ? 'down' : 'up');
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    /**
     * Bind the scroll handler if `off` is set to false.
     * If `off` is set to true reset the scroll direction.
     */
    !off
      ? window.addEventListener('scroll', onScroll)
      : setScrollDir(initialDirection);

    return () => window.removeEventListener('scroll', onScroll);
  }, [initialDirection, thresholdPixels, off]);

  return useMemo(() => ({ scrollDir, scrolled }), [scrollDir, scrolled]);
};

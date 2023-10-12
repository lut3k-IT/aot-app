import { useEffect, useState } from 'react';

export enum ScrollDirectionName {
  UP = 'up',
  DOWN = 'down'
}

export const useScrollDirection = () => {
  const threshold = 100;
  const [scrollDir, setScrollDir] = useState(ScrollDirectionName.UP);

  useEffect(() => {
    let previousScrollYPosition = window.scrollY;

    const updateScrollDirection = () => {
      const currentScrollYPosition = window.scrollY;
      if (Math.abs(currentScrollYPosition - previousScrollYPosition) > threshold) {
        const newScrollDirection =
          currentScrollYPosition > previousScrollYPosition ? ScrollDirectionName.DOWN : ScrollDirectionName.UP;
        setScrollDir(newScrollDirection);
        previousScrollYPosition = currentScrollYPosition > 0 ? currentScrollYPosition : 0;
      }
    };

    const onScroll = () => window.requestAnimationFrame(updateScrollDirection);

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return scrollDir;
};

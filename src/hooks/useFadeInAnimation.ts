import { useCallback } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right';

export const useFadeInAnimation = (direction: Direction = 'up', duration: number = 0.6) => {
  const getAnimation = useCallback(() => {
    const directions = {
      up: { y: 50 },
      down: { y: -50 },
      left: { x: 50 },
      right: { x: -50 }
    };

    return {
      hidden: {
        opacity: 0,
        ...directions[direction]
      },
      visible: {
        opacity: 1,
        ...(direction.includes('y') ? { y: 0 } : { x: 0 }),
        transition: {
          duration: duration,
          ease: 'easeOut'
        }
      }
    };
  }, [direction, duration]);

  return getAnimation();
};

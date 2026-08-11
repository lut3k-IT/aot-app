import { motion, useReducedMotion } from 'framer-motion';

import { MOTION_EASE } from '@/constants/motion';

const PARTICLE_COUNT = 6;
const PARTICLE_DISTANCE = 18;
const BURST_DURATION = 0.45;

interface HeartBurstProps {
  /** Licznik zwiekszany przy kazdym dodaniu do ulubionych. Zmiana wartosci odtwarza animacje. */
  burstKey: number;
}

/**
 * Warstwa efektu rysowana nad przyciskiem serca.
 * Nie reaguje na wskaznik i nie wplywa na uklad ani obszar klikalny.
 */
const HeartBurst = ({ burstKey }: HeartBurstProps) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion || burstKey === 0) return null;

  return (
    <span
      aria-hidden={true}
      className={'pointer-events-none absolute left-1/2 top-1/2 z-10 h-0 w-0'}
    >
      <motion.span
        key={`ring-${burstKey}`}
        className={'absolute -left-3 -top-3 block h-6 w-6 rounded-full border border-primary'}
        initial={{ scale: 0.2, opacity: 0.8 }}
        animate={{ scale: 1.8, opacity: 0 }}
        transition={{ duration: BURST_DURATION, ease: MOTION_EASE }}
      />
      {Array.from({ length: PARTICLE_COUNT }).map((_, index) => {
        const angle = (index * 2 * Math.PI) / PARTICLE_COUNT;
        const x = Math.cos(angle) * PARTICLE_DISTANCE;
        const y = Math.sin(angle) * PARTICLE_DISTANCE;

        return (
          <motion.span
            key={`particle-${burstKey}-${index}`}
            className={'absolute block h-1 w-1 rounded-full bg-primary'}
            initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
            animate={{ x, y, scale: 0, opacity: 0 }}
            transition={{ duration: BURST_DURATION, ease: MOTION_EASE }}
          />
        );
      })}
    </span>
  );
};

export default HeartBurst;

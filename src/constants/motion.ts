import { Transition, Variants } from 'framer-motion';

/** Czasy trwania animacji w sekundach — jedyne źródło prawdy dla całej aplikacji. */
export const MOTION_DURATION = {
  fast: 0.15,
  base: 0.25,
  slow: 0.4
} as const;

/** Standardowa krzywa wyjścia. Ruch startuje szybko i wyhamowuje. */
export const MOTION_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Puls serca — trzy klatki: stan spoczynku, wychylenie, powrót.
 * Celowo tween, nie sprężyna: framer-motion obsługuje sprężynę wyłącznie dla dwóch
 * klatek i przy dłuższej sekwencji przerywa animację błędem w konsoli.
 * `times` przesuwa szczyt na wczesną fazę, co daje odczucie sprężystego odbicia.
 */
export const HEART_PULSE: Transition = {
  duration: 0.35,
  ease: MOTION_EASE,
  times: [0, 0.4, 1]
};

/** Maksymalna liczba elementów objętych kaskadą — dalsze pojawiają się bez narastającego opóźnienia. */
const STAGGER_MAX_ITEMS = 12;
const STAGGER_STEP = 0.04;

export const getStaggerDelay = (index: number) => Math.min(index, STAGGER_MAX_ITEMS) * STAGGER_STEP;

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: MOTION_DURATION.base, ease: MOTION_EASE } }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: MOTION_DURATION.base, ease: MOTION_EASE } }
};

export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: MOTION_DURATION.slow, ease: MOTION_EASE } },
  exit: { opacity: 0, y: -8, transition: { duration: MOTION_DURATION.fast, ease: MOTION_EASE } }
};

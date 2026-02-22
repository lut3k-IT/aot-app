// src/components/hooks/useQuotations.ts
import { useEffect, useRef, useState } from 'react';

import { selectQuotationsData } from '@/store/quotationsSlice';
import { getRandomQuotation } from '@/utils/quotationHelpers';

import useAppSelector from './useAppSelector';
import useIsMobile from './useIsMobile';

const MAX_LOOP = 2;

export const useQuotationsSlideshow = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const originalQuotations = useAppSelector(selectQuotationsData);
  const [remainingQuotations, setRemainingQuotations] = useState([...originalQuotations]);
  const [currentQuotation, setCurrentQuotation] = useState(getRandomQuotation(remainingQuotations));

  const [loopCount, setLoopCount] = useState(0);
  const [animationDuration, setAnimationDuration] = useState('20s');

  const speed = isMobile ? 60 : 80; // pixels / s

  useEffect(() => {
    setRemainingQuotations([...originalQuotations]);
    setCurrentQuotation(getRandomQuotation(originalQuotations));
  }, [originalQuotations]);

  useEffect(() => {
    if (textRef.current) {
      const textWidth = textRef.current.offsetWidth;
      // The CSS animation uses translate-x-[100vw], so the text starts at 100vw regardless of container width.
      // Total distance to travel = 100vw (entry offset) + textWidth (to clear the container completely).
      const distance = window.innerWidth + textWidth;
      const newAnimationDuration = distance / speed;
      setAnimationDuration(`${newAnimationDuration}s`);
    }
  }, [currentQuotation, isMobile, speed]);

  useEffect(() => {
    const textElement = textRef.current;
    if (textElement) {
      const handleAnimationIteration = () => {
        setLoopCount((prevCount) => prevCount + 1);
      };
      textElement.addEventListener('animationiteration', handleAnimationIteration);
      return () => {
        textElement.removeEventListener('animationiteration', handleAnimationIteration);
      };
    }
  }, [currentQuotation]);

  useEffect(() => {
    if (loopCount === MAX_LOOP) {
      setRemainingQuotations((prevRemaining) =>
        prevRemaining.filter((quotation) => quotation.id !== currentQuotation.id)
      );
      if (remainingQuotations.length === 0) {
        setRemainingQuotations([...originalQuotations]);
      }
      setCurrentQuotation(getRandomQuotation(remainingQuotations));
      setLoopCount(0);
    }
  }, [loopCount, currentQuotation, originalQuotations, remainingQuotations]);

  return {
    currentQuotation,
    animationDuration,
    textRef
  };
};

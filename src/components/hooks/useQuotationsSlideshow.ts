// src/components/hooks/useQuotations.ts
import { useEffect, useRef, useState } from 'react';

import { getRandomQuotation } from '@/utils/quotationHelpers';

import useAppSelector from './useAppSelector';

const MAX_LOOP = 2;

export const useQuotationsSlideshow = () => {
  const textRef = useRef<HTMLDivElement>(null);

  const originalQuotations = useAppSelector((state) => state.quotations.data);
  const [remainingQuotations, setRemainingQuotations] = useState([...originalQuotations]);
  const [currentQuotation, setCurrentQuotation] = useState(getRandomQuotation(remainingQuotations));

  const [loopCount, setLoopCount] = useState(0);
  const [animationDuration, setAnimationDuration] = useState('20s');

  useEffect(() => {
    setRemainingQuotations([...originalQuotations]);
    setCurrentQuotation(getRandomQuotation(originalQuotations));
  }, [originalQuotations]);

  useEffect(() => {
    if (textRef.current && textRef.current.parentElement) {
      const textWidth = textRef.current.offsetWidth;
      const scrollContainerWidth = textRef.current.parentElement.offsetWidth;
      const newAnimationDuration = scrollContainerWidth * (textWidth / 10000);
      setAnimationDuration(`${newAnimationDuration}s`);
    }
  }, [currentQuotation]);

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

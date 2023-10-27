import { useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';

import useAppSelector from '../hooks/useAppSelector';
import HeartButton from './HeartButton';

const QuotationBarMobile = () => {
  const originalQuotations = useAppSelector((state) => state.quotations.data);
  const favoriteQuotationsIds = useAppSelector((state) => state.quotations.favoriteIds);
  const fetchingStatus = useAppSelector((state) => state.quotations.status);
  const fetchingError = useAppSelector((state) => state.quotations.error);

  const textRef = useRef<HTMLDivElement>(null);
  const [currentQuotation, setCurrentQuotation] = useState(originalQuotations[0]);
  const [loopCount, setLoopCount] = useState(0);
  const [animationDuration, setAnimationDuration] = useState('20s');

  useEffect(() => {
    setCurrentQuotation(originalQuotations[0]);
  }, [originalQuotations]);

  useEffect(() => {
    if (textRef.current && textRef.current.parentElement) {
      const textWidth = textRef.current.offsetWidth;
      const scrollContainerWidth = textRef.current.parentElement.offsetWidth;
      const newAnimationDuration = (scrollContainerWidth * textWidth) / 10000;
      setAnimationDuration(`${newAnimationDuration}s`);
    }
  }, [currentQuotation]);

  /* -------------------------------------------------------------------------- */
  /*                                   testing                                  */
  /* -------------------------------------------------------------------------- */

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
    if (loopCount === 2) {
      const currentIndex = originalQuotations.indexOf(currentQuotation);
      setCurrentQuotation(originalQuotations[currentIndex + 1] || originalQuotations[0]);
      setLoopCount(0);
    }
  }, [loopCount, currentQuotation, originalQuotations]);

  /* -------------------------------------------------------------------------- */
  /*                                   testing                                  */
  /* -------------------------------------------------------------------------- */

  const handleToggleFavorite = () => {};

  return (
    <div
      className={
        'flex items-center justify-between px-[22px] py-1 gap-2 bg-background border-b z-20 w-full fixed top-12'
      }
    >
      <div className={'overflow-hidden line-clamp-1 w-full'}>
        <div
          ref={textRef}
          key={currentQuotation?.id || v4()}
          className={'text-sm font-normal italic text-muted-foreground w-max min-w-full translate-x-[100vw]'}
          style={{
            animation: `horizontal-scroll-animation ${animationDuration} linear infinite`
          }}
        >
          {currentQuotation?.text || ''}
        </div>
      </div>
      <HeartButton
        iconSize={'sm'}
        isFilled={false}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
};

export default QuotationBarMobile;

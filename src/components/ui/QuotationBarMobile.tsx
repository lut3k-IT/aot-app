import { useCallback, useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';

import { addFavorite, removeFavorite } from '@/store/quotationsSlice';
import { isInFavorites } from '@/utils/dataProcessing';
import { getRandomQuotation } from '@/utils/quotationHelpers';

import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import HeartButton from './HeartButton';

const MAX_LOOP = 2;

const QuotationBarMobile = () => {
  const dispatch = useAppDispatch();
  const textRef = useRef<HTMLDivElement>(null);

  const originalQuotations = useAppSelector((state) => state.quotations.data);
  const favoriteQuotationsIds = useAppSelector((state) => state.quotations.favoriteIds);
  // const fetchingStatus = useAppSelector((state) => state.quotations.status);
  // const fetchingError = useAppSelector((state) => state.quotations.error);

  const [remainingQuotations, setRemainingQuotations] = useState([...originalQuotations]);
  const [currentQuotation, setCurrentQuotation] = useState(getRandomQuotation(remainingQuotations));
  const [loopCount, setLoopCount] = useState(0);
  const [animationDuration, setAnimationDuration] = useState('20s');

  const isCurrentFavorite = !!currentQuotation && isInFavorites(currentQuotation.id, favoriteQuotationsIds);

  const handleToggleFavorite = useCallback(() => {
    const action = isCurrentFavorite ? removeFavorite : addFavorite;
    dispatch(action(currentQuotation.id));
  }, [isCurrentFavorite, currentQuotation, dispatch]);

  /* ---------------------------------- Init ---------------------------------- */

  useEffect(() => {
    setRemainingQuotations([...originalQuotations]);
    setCurrentQuotation(getRandomQuotation(originalQuotations));
  }, [originalQuotations]);

  /* --------------------------- Animation duration --------------------------- */

  useEffect(() => {
    if (textRef.current && textRef.current.parentElement) {
      const textWidth = textRef.current.offsetWidth;
      const scrollContainerWidth = textRef.current.parentElement.offsetWidth;
      // const newAnimationDuration = (scrollContainerWidth * textWidth) / 10000;
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
        isFilled={isCurrentFavorite}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
};

export default QuotationBarMobile;

import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';

import { RoutePath } from '@/constants/enums';
import { addFavorite, removeFavorite } from '@/store/quotationsSlice';
import { isInFavorites } from '@/utils/dataHelpers';
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
  const fetchingStatus = useAppSelector((state) => state.quotations.status);
  const fetchingError = useAppSelector((state) => state.quotations.error);

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
        'fixed top-12 z-30 flex h-9 w-full items-center justify-between gap-2 border-b bg-background px-[1.375rem] py-1'
      }
    >
      {currentQuotation ? (
        <>
          <Link
            to={`${RoutePath.QUOTATION_DETAILS}/${currentQuotation.id}`}
            className={'focus-visible-styles line-clamp-1 w-full overflow-hidden'}
          >
            <div
              ref={textRef}
              key={currentQuotation.id || v4()}
              className={'w-max min-w-full translate-x-[100vw] text-sm font-normal italic text-muted-foreground'}
              style={{
                animation: `horizontal-scroll-animation ${animationDuration} linear infinite`
              }}
            >
              {currentQuotation.text || ''}
            </div>
          </Link>
          <HeartButton
            iconSize={'sm'}
            isFilled={isCurrentFavorite}
            onToggleFavorite={handleToggleFavorite}
          />
        </>
      ) : (
        <div />
      )}
    </div>
  );
};

export default QuotationBarMobile;

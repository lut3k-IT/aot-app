import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';

import { RoutePath } from '@/constants/enums';
import { addFavorite, removeFavorite } from '@/store/quotationsSlice';
import { isInFavorites } from '@/utils/dataHelpers';

import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import { useQuotationsSlideshow } from '../hooks/useQuotationsSlideshow';
import HeartButton from './HeartButton';

// @todo - refactor to use useQuotations custom hook
const QuotationBarMobile = () => {
  const dispatch = useAppDispatch();

  const favoriteQuotationsIds = useAppSelector((state) => state.quotations.favoriteIds);
  const fetchingStatus = useAppSelector((state) => state.quotations.status);
  const fetchingError = useAppSelector((state) => state.quotations.error);

  const { currentQuotation, animationDuration, textRef } = useQuotationsSlideshow();

  /* ------------------------- favorite functionality ------------------------- */

  const isCurrentFavorite = !!currentQuotation && isInFavorites(currentQuotation.id, favoriteQuotationsIds);

  const handleToggleFavorite = useCallback(() => {
    const action = isCurrentFavorite ? removeFavorite : addFavorite;
    dispatch(action(currentQuotation.id));
  }, [isCurrentFavorite, currentQuotation, dispatch]);

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

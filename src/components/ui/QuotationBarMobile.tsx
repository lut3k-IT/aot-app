import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { RoutePath } from '@/constants/enums';
import { addFavorite, removeFavorite } from '@/store/quotationsSlice';
import { isInFavorites } from '@/utils/dataHelpers';

import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import useIsMobile from '../hooks/useIsMobile';
import { useQuotationsSlideshow } from '../hooks/useQuotationsSlideshow';
import { Card } from './Card';
import HeartButton from './HeartButton';

// @todo - refactor to use useQuotations custom hook
const QuotationBarMobile = () => {
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();

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

  /* ---------------------------- proxy components ---------------------------- */

  const MobileBar = () => (
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
              key={currentQuotation.id}
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

  const DesktopBar = () => (
    <Card className={'flex h-10 w-full items-center justify-between overflow-hidden px-4'}>
      {currentQuotation ? (
        <>
          <Link
            to={`${RoutePath.QUOTATION_DETAILS}/${currentQuotation.id}`}
            className={'focus-visible-styles line-clamp-1 w-full overflow-hidden'}
          >
            <div
              ref={textRef}
              key={currentQuotation.id}
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
    </Card>
  );

  return isMobile ? <MobileBar /> : <DesktopBar />;
};

export default QuotationBarMobile;

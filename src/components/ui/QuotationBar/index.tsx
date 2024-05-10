import useIsLandscape from '@/components/hooks/useIsLandscape';
import useIsMobileOrLandscape from '@/components/hooks/useIsMobileOrLandscape';
import { useToggleFavorite } from '@/components/hooks/useToggleFavorite';
import { addFavorite, removeFavorite } from '@/store/quotationsSlice';
import { isInFavorites } from '@/utils/dataHelpers';

import useAppSelector from '../../hooks/useAppSelector';
import { useQuotationsSlideshow } from '../../hooks/useQuotationsSlideshow';
import BarContent from './components/BarContent';
import DesktopBarWrapper from './components/DesktopBarWrapper';
import MobileBarWrapper from './components/MobileBarWrapper';

const QuotationBar = () => {
  const isMobileLandscape = useIsMobileOrLandscape();
  const isLandscape = useIsLandscape();

  const favoriteQuotationsIds = useAppSelector((state) => state.quotations.favoriteIds);
  const fetchingStatus = useAppSelector((state) => state.quotations.status);
  const fetchingError = useAppSelector((state) => state.quotations.error);

  const { currentQuotation, animationDuration, textRef } = useQuotationsSlideshow();

  const isCurrentFavorite = !!currentQuotation && isInFavorites(currentQuotation.id, favoriteQuotationsIds);

  const toggleFavorite = useToggleFavorite(isCurrentFavorite, currentQuotation.id, addFavorite, removeFavorite);

  const barContentProps = {
    currentQuotation,
    animationDuration,
    textRef,
    isCurrentFavorite,
    onToggleFavorite: toggleFavorite
  };

  if (isLandscape) return null;

  return isMobileLandscape ? (
    <MobileBarWrapper>
      <BarContent {...barContentProps} />
    </MobileBarWrapper>
  ) : (
    <DesktopBarWrapper>
      <BarContent {...barContentProps} />
    </DesktopBarWrapper>
  );
};

export default QuotationBar;

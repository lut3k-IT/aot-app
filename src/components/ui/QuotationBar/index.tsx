import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { addFavorite, removeFavorite } from '@/store/quotationsSlice';
import { isInFavorites } from '@/utils/dataHelpers';

import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import useIsMobile from '../../hooks/useIsMobile';
import { useQuotationsSlideshow } from '../../hooks/useQuotationsSlideshow';
import { useToast } from '../../hooks/useToast';
import BarContent from './components/BarContent';
import DesktopBarWrapper from './components/DesktopBarWrapper';
import MobileBarWrapper from './components/MobileBarWrapper';

const QuotationBar = () => {
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const { toast } = useToast();

  const favoriteQuotationsIds = useAppSelector((state) => state.quotations.favoriteIds);
  const fetchingStatus = useAppSelector((state) => state.quotations.status);
  const fetchingError = useAppSelector((state) => state.quotations.error);

  const { currentQuotation, animationDuration, textRef } = useQuotationsSlideshow();

  const isCurrentFavorite = !!currentQuotation && isInFavorites(currentQuotation.id, favoriteQuotationsIds);

  const handleToggleFavorite = useCallback(() => {
    const action = isCurrentFavorite ? removeFavorite : addFavorite;
    dispatch(action(currentQuotation.id));
    toast({
      title: isCurrentFavorite
        ? t('notifications:common.removedFromFavorites')
        : t('notifications:common.addedToFavorites')
    });
  }, [isCurrentFavorite, currentQuotation, dispatch]);

  const barContentProps = {
    currentQuotation,
    animationDuration,
    textRef,
    isCurrentFavorite,
    handleToggleFavorite
  };

  return isMobile ? (
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

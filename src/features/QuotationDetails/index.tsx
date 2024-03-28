import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import useAppDispatch from '@/components/hooks/useAppDispatch';
import useAppSelector from '@/components/hooks/useAppSelector';
import useIsMobileLandscape from '@/components/hooks/useIsMobileLandscape';
import { useToast } from '@/components/hooks/useToast';
import useValidateIdFromParam from '@/components/hooks/useValidateIdFromParam';
import AppHelmet from '@/components/ui/AppHelmet';
import ButtonGoBack from '@/components/ui/ButtonGoBack';
import { Card } from '@/components/ui/Card';
import FavoriteButton from '@/components/ui/FavoriteButton';
import { RoutePath } from '@/constants/enums';
import { addFavorite, removeFavorite } from '@/store/quotationsSlice';
import { isInFavorites } from '@/utils/dataHelpers';

const QuotationDetails = () => {
  const { id } = useParams();
  const isMobileLandscape = useIsMobileLandscape();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { toast } = useToast();

  const paramQuotationId = useValidateIdFromParam(id);

  const quotations = useAppSelector((state) => state.quotations.data);
  const favoriteQuotationsId = useAppSelector((state) => state.quotations.favoriteIds);
  const fetchingStatus = useAppSelector((state) => state.quotations.status);
  const fetchingError = useAppSelector((state) => state.quotations.error);

  const quotation = quotations.find((quotation) => quotation.id === paramQuotationId);
  const isFavorite = isInFavorites(paramQuotationId, favoriteQuotationsId);

  const handleToggleFavorite = useCallback(() => {
    const action = isFavorite ? removeFavorite : addFavorite;
    dispatch(action(paramQuotationId));
    toast({
      title: isFavorite ? t('notifications:common.removedFromFavorites') : t('notifications:common.addedToFavorites')
    });
  }, [isFavorite, dispatch]);

  // @audit this should be handled by the custom hook
  if (!quotation && quotations.length > 0) throw new Error('Quotation with this ID does not exist.');
  if (!quotation) return;

  return (
    <div
      className={classNames({
        'pt-body-pad-start': isMobileLandscape
      })}
    >
      <ButtonGoBack fallbackRoute={RoutePath.QUOTATIONS} />
      <AppHelmet title={`${quotation.text.substring(0, 20)}${quotation.text.length > 20 ? '...' : ''}`} />
      <Card className={'mt-8 p-4'}>
        <p>{quotation.text}</p>
      </Card>
      <FavoriteButton
        isFavorite={isFavorite}
        handleToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
};

export default QuotationDetails;

import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import useAppDispatch from '@/components/hooks/useAppDispatch';
import useAppSelector from '@/components/hooks/useAppSelector';
import useValidateIdFromParam from '@/components/hooks/useValidateIdFromParam';
import AppHelmet from '@/components/ui/AppHelmet';
import { Button } from '@/components/ui/Button';
import ButtonGoBack from '@/components/ui/ButtonGoBack';
import { Card } from '@/components/ui/Card';
import { RoutePath } from '@/constants/enums';
import { addFavorite, removeFavorite } from '@/store/quotationsSlice';
import { isInFavorites } from '@/utils/dataHelpers';

const QuotationDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

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
  }, [isFavorite, dispatch]);

  if (!quotation && quotations.length > 0) throw new Error('Quotation with this ID does not exist.');
  if (!quotation) return;

  return (
    <div className={'pt-body-pad-start'}>
      <ButtonGoBack fallbackRoute={RoutePath.QUOTATIONS} />
      <AppHelmet title={`${quotation.text.substring(0, 20)}${quotation.text.length > 20 ? '...' : ''}`} />
      <Card className={'mt-4 p-4'}>
        <p>{quotation.text}</p>
      </Card>
      <Button
        className={'mt-4 w-full max-w-[31.25rem]'}
        iconName={'heart'}
        variant={isFavorite ? 'secondary' : 'default'}
        iconProps={{ isFilled: isFavorite, className: isFavorite ? 'text-red-500 fill-red-500' : '' }}
        onClick={handleToggleFavorite}
      >
        {isFavorite ? t('common:action.removeFromFavorites') : t('common:action.addToFavorites')}
      </Button>
    </div>
  );
};

export default QuotationDetails;

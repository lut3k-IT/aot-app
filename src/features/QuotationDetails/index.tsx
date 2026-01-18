'use client';

import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import { useApiErrorToast } from '@/components/hooks/useApiErrorToast';
import useAppSelector from '@/components/hooks/useAppSelector';
import useIsLandscape from '@/components/hooks/useIsLandscape';
import useIsMobile from '@/components/hooks/useIsMobile';
import { useToggleFavorite } from '@/components/hooks/useToggleFavorite';
import useValidateIdFromParam from '@/components/hooks/useValidateIdFromParam';
import ButtonGoBack from '@/components/ui/ButtonGoBack';
import { Card } from '@/components/ui/Card';
import DynamicTitle from '@/components/ui/DynamicTitle';
import FavoriteButton from '@/components/ui/FavoriteButton';
import { RoutePath } from '@/constants/enums';
import { addFavorite, removeFavorite } from '@/store/quotationsSlice';
import { isInFavorites } from '@/utils/dataHelpers';

interface QuotationDetailsProps {
  routeId?: string;
}

const QuotationDetails = ({ routeId }: QuotationDetailsProps) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const isLandscape = useIsLandscape();

  const paramQuotationId = useValidateIdFromParam(routeId);

  const quotations = useAppSelector((state) => state.quotations.data);
  const favoriteQuotationsId = useAppSelector((state) => state.quotations.favoriteIds);
  const fetchingError = useAppSelector((state) => state.quotations.error);
  useApiErrorToast(fetchingError);

  const quotation = quotations.find((quotation) => quotation.id === paramQuotationId);
  const isFavorite = isInFavorites(paramQuotationId, favoriteQuotationsId);

  const toggleFavorite = useToggleFavorite(isFavorite, paramQuotationId, addFavorite, removeFavorite);

  if (!quotation && quotations.length > 0) throw new Error('Quotation with this ID does not exist.');
  if (!quotation) return;

  return (
    <div className='flex h-full w-full flex-col'>
      <DynamicTitle title={t('common:title.quotations')} />
      <ButtonGoBack fallbackRoute={RoutePath.QUOTATIONS} />
      <Card className={'mt-8 p-4'}>
        <p>{quotation.text}</p>
      </Card>
      <FavoriteButton
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
};

export default QuotationDetails;

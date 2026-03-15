'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import { useApiErrorToast } from '@/components/hooks/useApiErrorToast';
import useAppSelector from '@/components/hooks/useAppSelector';
import { useToggleFavorite } from '@/components/hooks/useToggleFavorite';
import useValidateIdFromParam from '@/components/hooks/useValidateIdFromParam';
import ButtonGoBack from '@/components/ui/ButtonGoBack';
import { Card } from '@/components/ui/Card';
import DynamicTitle from '@/components/ui/DynamicTitle';
import FavoriteButton from '@/components/ui/FavoriteButton';
import { RoutePath } from '@/constants/enums';
import { addFavorite, removeFavorite, selectQuotationsData, selectQuotationsError, selectQuotationsFavoriteIds } from '@/store/quotationsSlice';
import { isInFavorites } from '@/utils/dataHelpers';

import DetailsContainer from '../Details/components/DetailsContainer';

interface QuotationDetailsProps {
  routeId?: string;
}

const QuotationDetails = ({ routeId }: QuotationDetailsProps) => {
  const { t } = useTranslation();

  const paramQuotationId = useValidateIdFromParam(routeId);

  const quotations = useAppSelector(selectQuotationsData);
  const favoriteQuotationsId = useAppSelector(selectQuotationsFavoriteIds);
  const fetchingError = useAppSelector(selectQuotationsError);
  useApiErrorToast(fetchingError);

  const quotation = quotations.find((q) => q.id === paramQuotationId);
  const isFavorite = isInFavorites(paramQuotationId, favoriteQuotationsId);

  const toggleFavorite = useToggleFavorite(isFavorite, paramQuotationId, addFavorite, removeFavorite);

  if (!quotation && quotations.length > 0) throw new Error('Quotation with this ID does not exist.');
  if (!quotation) return;

  return (
    <DetailsContainer>
      <DynamicTitle title={t('common:title.quotations')} />
      <div className={'flex items-center justify-between'}>
        <ButtonGoBack fallbackRoute={RoutePath.QUOTATIONS} />
        <FavoriteButton
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={'mt-6'}
      >
        <Card className={'p-6'}>
          <span className={'block select-none text-6xl leading-none text-muted-foreground/30'}>&#8220;</span>
          <p className={'mt-2 text-base leading-relaxed'}>{quotation.text}</p>
        </Card>
      </motion.div>
    </DetailsContainer>
  );
};

export default QuotationDetails;

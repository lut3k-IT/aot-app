import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { RoutePath } from '@/constants/enums';
import { cn } from '@/lib/utils';
import { addFavorite, removeFavorite } from '@/store/quotationsSlice';
import { isInFavorites } from '@/utils/dataHelpers';

import useAppDispatch from '../hooks/useAppDispatch';
import { useToast } from '../hooks/useToast';
import { Card } from './Card';
import HeartButton from './HeartButton';

interface QuotationCardProps {
  id: number;
  text: React.ReactNode;
  favoritesList: number[];
  className?: string;
}

const QuotationCard = (props: QuotationCardProps) => {
  const { id, text, favoritesList, className } = props;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { toast } = useToast();

  const isFavorite = isInFavorites(id, favoritesList);

  const handleToggleFavorite = useCallback(() => {
    const action = isFavorite ? removeFavorite : addFavorite;
    dispatch(action(id));
    toast({
      title: isFavorite ? t('notifications:common.removedFromFavorites') : t('notifications:common.addedToFavorites')
    });
  }, [isFavorite, dispatch]);

  return (
    <Link to={`${RoutePath.QUOTATION_DETAILS}/${id}`}>
      <Card className={cn('relative h-full w-full rounded-md border p-4 pr-14', className)}>
        <div className={'text-md line-clamp-3 overflow-hidden'}>{text}</div>
        <HeartButton
          onToggleFavorite={handleToggleFavorite}
          className={'absolute right-3 top-3 h-min'}
          isFilled={isFavorite}
        />
      </Card>
    </Link>
  );
};

export default QuotationCard;

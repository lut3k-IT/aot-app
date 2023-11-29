import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { RoutePath } from '@/constants/enums';
import { cn } from '@/lib/utils';
import { addFavorite, removeFavorite } from '@/store/quotationsSlice';
import { isInFavorites } from '@/utils/dataHelpers';

import useAppDispatch from '../hooks/useAppDispatch';
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

  const isFavorite = isInFavorites(id, favoritesList);

  const handleToggleFavorite = useCallback(() => {
    const action = isFavorite ? removeFavorite : addFavorite;
    dispatch(action(id));
  }, [isFavorite, dispatch]);

  return (
    <Link to={`${RoutePath.QUOTATION_DETAILS}/${id}`}>
      <Card className={cn('relative w-full rounded-md border p-4 pr-14', className)}>
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

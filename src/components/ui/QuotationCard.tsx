import React from 'react';
import { Link } from 'react-router-dom';

import { RoutePath } from '@/constants/enums';
import { cn } from '@/lib/utils';
import { addFavorite, removeFavorite } from '@/store/quotationsSlice';
import { isInFavorites } from '@/utils/dataHelpers';

import { useToggleFavorite } from '../hooks/useToggleFavorite';
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
  const isFavorite = isInFavorites(id, favoritesList);
  const toggleFavorite = useToggleFavorite(isFavorite, id, addFavorite, removeFavorite);

  return (
    <Link to={`${RoutePath.QUOTATION_DETAILS}/${id}`}>
      <Card className={cn('relative h-full w-full rounded-md border p-4 pr-14', className)}>
        <div className={'text-md line-clamp-3 overflow-hidden'}>{text}</div>
        <HeartButton
          className={'absolute right-3 top-3'}
          isFilled={isFavorite}
          onToggleFavorite={(event: React.MouseEvent) => toggleFavorite(event)}
        />
      </Card>
    </Link>
  );
};

export default QuotationCard;

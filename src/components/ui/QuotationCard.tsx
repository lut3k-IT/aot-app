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
      <Card className={cn('w-full p-4 pr-14 border rounded-md relative', className)}>
        {/* <div className={'absolute flex-center right-1 bottom-0.5 text-xs text-neutral-300 dark:text-neutral-700'}>
          {id}
        </div> */}
        <div className={'line-clamp-3 overflow-hidden text-md'}>{text}</div>
        <HeartButton
          onToggleFavorite={handleToggleFavorite}
          className={'h-min absolute top-3 right-3'}
          isFilled={isFavorite}
        />
      </Card>
    </Link>
  );
};

export default QuotationCard;

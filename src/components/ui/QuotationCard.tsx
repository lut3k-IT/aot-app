import React from 'react';
import Link from 'next/link';

import { RoutePath } from '@/constants/enums';
import { cn } from '@/lib/utils';
import { addFavorite, removeFavorite } from '@/store/quotationsSlice';

import { useToggleFavorite } from '../hooks/useToggleFavorite';
import { Card } from './Card';
import HeartButton from './HeartButton';

interface QuotationCardProps {
  id: number;
  text: React.ReactNode;
  isFavorite: boolean;
  className?: string;
}

const QuotationCard = (props: QuotationCardProps) => {
  const { id, text, isFavorite, className } = props;
  const toggleFavorite = useToggleFavorite(isFavorite, id, addFavorite, removeFavorite);

  return (
    <Link href={`${RoutePath.QUOTATION_DETAILS}/${id}`}>
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

export default React.memo(QuotationCard);

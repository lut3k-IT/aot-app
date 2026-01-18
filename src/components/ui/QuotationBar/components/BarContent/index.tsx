import React from 'react';
import Link from 'next/link';

import HeartButton from '@/components/ui/HeartButton';
import { RoutePath } from '@/constants/enums';
import { QuotationType } from '@/constants/types';

interface BarContentProps {
  currentQuotation: QuotationType;
  animationDuration: string;
  textRef: React.RefObject<HTMLDivElement>;
  isCurrentFavorite: boolean;
  onToggleFavorite: () => void;
}

const BarContent = (props: BarContentProps) => {
  const { currentQuotation, animationDuration, textRef, isCurrentFavorite, onToggleFavorite } = props;

  if (!currentQuotation) return null;

  return (
    <>
      <Link
        href={`${RoutePath.QUOTATION_DETAILS}/${currentQuotation.id}`}
        className={'focus-visible-styles relative line-clamp-1 w-full overflow-hidden'}
      >
        <div className={'absolute left-0 top-0 z-10 h-full w-2 bg-gradient-to-r from-card'} />
        <div className={'absolute right-0 top-0 z-10 h-full w-2 bg-gradient-to-l from-card'} />
        <div
          ref={textRef}
          key={currentQuotation.id}
          className={'w-max min-w-full translate-x-[100vw] text-sm font-normal italic text-muted-foreground'}
          style={{
            animation: `horizontal-scroll-animation ${animationDuration} linear infinite`
          }}
        >
          {currentQuotation.text || ''}
        </div>
      </Link>
      <HeartButton
        iconSize={'sm'}
        isFilled={isCurrentFavorite}
        onToggleFavorite={onToggleFavorite}
      />
    </>
  );
};

export default BarContent;

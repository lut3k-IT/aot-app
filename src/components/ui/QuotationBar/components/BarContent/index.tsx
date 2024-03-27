import React from 'react';
import { Link } from 'react-router-dom';

import HeartButton from '@/components/ui/HeartButton';
import { RoutePath } from '@/constants/enums';
import { QuotationType } from '@/constants/types';

interface BarContentProps {
  currentQuotation: QuotationType;
  animationDuration: string;
  textRef: React.RefObject<HTMLDivElement>;
  isCurrentFavorite: boolean;
  handleToggleFavorite: () => void;
}

const BarContent = (props: BarContentProps) => {
  const { currentQuotation, animationDuration, textRef, isCurrentFavorite, handleToggleFavorite } = props;

  if (!currentQuotation) return null;

  return (
    <>
      <Link
        to={`${RoutePath.QUOTATION_DETAILS}/${currentQuotation.id}`}
        className={'focus-visible-styles line-clamp-1 w-full overflow-hidden'}
      >
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
        onToggleFavorite={handleToggleFavorite}
      />
    </>
  );
};

export default BarContent;

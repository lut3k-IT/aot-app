import React from 'react';

import { CARD_SKELETONS_COUNT } from '@/constants/constants';

interface MultipleSkeletonsProps {
  skeletonComponent: React.ComponentType;
  numberOfCards?: number;
}

const MultipleSkeletons = (props: MultipleSkeletonsProps) => {
  const { skeletonComponent: SkeletonComponent, numberOfCards = CARD_SKELETONS_COUNT } = props;
  return Array.from({ length: numberOfCards }, (_, index) => <SkeletonComponent key={index} />);
};

export default MultipleSkeletons;

import React from 'react';

import useAppSelector from '@/components/hooks/useAppSelector';
import Icon from '@/components/ui/Icon';

// @todo tooltip for the eyes icon

// @todo make it return null if spoiler mode is off and manage what to show in the component
export const SpoilerContent = (content: React.ReactNode): React.ReactNode => {
  const isShowingSpoilers = useAppSelector((state) => state.spoilerMode);
  return isShowingSpoilers ? content || '-' : <Icon name={'eyeOff'} />;
};

import React from 'react';

import useAppSelector from '@/components/hooks/useAppSelector';
import Icon from '@/components/ui/Icon';
import { selectSpoilerMode } from '@/store/spoilerModeSlice';

interface SpoilerContentProps {
  children: React.ReactNode;
}

const SpoilerContent = ({ children }: SpoilerContentProps) => {
  const isShowingSpoilers = useAppSelector(selectSpoilerMode);
  return isShowingSpoilers ? children || '-' : <Icon name={'eyeOff'} />;
};

export default SpoilerContent;

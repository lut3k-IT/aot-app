import React from 'react';

import useAppSelector from '@/components/hooks/useAppSelector';
import Icon from '@/components/ui/Icon';
import { selectSpoilerMode } from '@/store/spoilerModeSlice';

const SpoilerContent = (content: React.ReactNode): React.ReactNode => {
  const isShowingSpoilers = useAppSelector(selectSpoilerMode);
  return isShowingSpoilers ? content || '-' : <Icon name={'eyeOff'} />;
};

export default SpoilerContent;

import React from 'react';

import useIsMobileOrLandscape from '@/components/hooks/useIsMobileOrLandscape';
import { TitanType } from '@/constants/types';

import DesktopTiles from '../DesktopTiles';
import MobileTiles from '../MobileTiles';

interface TilesProps {
  titan: TitanType;
  currentInheritor: string;
  formerInheritors: string;
}

const Tiles: React.FC<TilesProps> = ({ titan, currentInheritor, formerInheritors }) => {
  const isMobileOrLandscape = useIsMobileOrLandscape();
  return isMobileOrLandscape ? (
    <MobileTiles
      titan={titan}
      currentInheritor={currentInheritor}
      formerInheritors={formerInheritors}
    />
  ) : (
    <DesktopTiles
      titan={titan}
      currentInheritor={currentInheritor}
      formerInheritors={formerInheritors}
    />
  );
};

export default Tiles;

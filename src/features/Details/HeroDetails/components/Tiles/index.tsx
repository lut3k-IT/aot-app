import React from 'react';

import useIsMobileOrLandscape from '@/components/hooks/useIsMobileOrLandscape';
import { HeroType } from '@/constants/types';

import DesktopTiles from '../DesktopTiles';
import MobileTiles from '../MobileTiles';

interface TilesProps {
  hero: HeroType;
}

const Tiles: React.FC<TilesProps> = ({ hero }) => {
  const isMobileOrLandscape = useIsMobileOrLandscape();
  return isMobileOrLandscape ? <MobileTiles hero={hero} /> : <DesktopTiles hero={hero} />;
};

export default Tiles;

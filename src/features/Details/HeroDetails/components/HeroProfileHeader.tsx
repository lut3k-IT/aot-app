import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import { Badge } from '@/components/ui/Badge';
import ButtonGoBack from '@/components/ui/ButtonGoBack';
import CharacterPicture from '@/components/ui/CharacterPicture';
import HeartButton from '@/components/ui/HeartButton';
import { RoutePath } from '@/constants/enums';
import { HeroType, MbtiGroups } from '@/constants/types';
import { cn } from '@/lib/utils';
import { getHeroImageSource } from '@/utils/dataHelpers';

import { getMbtiGroupClasses } from '../../utils/mbtiColors';

interface HeroProfileHeaderProps {
  hero: HeroType;
  mbtiGroupName: MbtiGroups;
  isFavorite: boolean;
  onToggleFavorite: (event: React.MouseEvent) => void;
}

const HeroProfileHeader = ({ hero, mbtiGroupName, isFavorite, onToggleFavorite }: HeroProfileHeaderProps) => {
  const { t } = useTranslation();
  const colors = getMbtiGroupClasses(mbtiGroupName);
  const fullName = `${hero.firstName} ${hero.lastName || ''}`.trim();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      {/* Full-width cover banner */}
      <div className={cn('relative h-52 w-full rounded-lg bg-gradient-to-b to-transparent', colors.gradient)}>
        <div className={'absolute left-3 top-3 z-10'}>
          <ButtonGoBack
            fallbackRoute={RoutePath.HEROES}
            aria-label={t('common:navigation.goBack')}
          />
        </div>
      </div>

      {/* Avatar + name — avatar overlaps the cover */}
      <div className={'flex flex-col items-center -mt-[150px]'}>
        <CharacterPicture
          imgSource={getHeroImageSource(hero.slug)}
          alt={`${fullName} - Attack on Titan ${t('common:brand')}`}
          size={'xl'}
          variant={'circle'}
          className={'border-4 border-background'}
        />

        <div className={'mt-3 flex items-center gap-1.5'}>
          <h1 className={'text-2xl font-bold'}>{fullName}</h1>
          <HeartButton
            isFilled={isFavorite}
            onToggleFavorite={onToggleFavorite}
            iconSize={'sm'}
          />
        </div>

        {hero.alias.length > 0 && (
          <div className={'mt-2 flex flex-wrap justify-center gap-1.5 px-4'}>
            {hero.alias.map((alias) => (
              <Badge
                key={alias}
                variant={'secondary'}
                className={'text-xs'}
              >
                {alias}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default HeroProfileHeader;

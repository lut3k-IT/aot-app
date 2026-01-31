'use client';

import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';

import useAppSelector from '@/components/hooks/useAppSelector';
import DynamicTitle from '@/components/ui/DynamicTitle';
import { Label } from '@/components/ui/Label';
import { Switch } from '@/components/ui/Switch';
import { HeroType } from '@/constants/types';
import { selectHeroesData } from '@/store/heroesSlice';

import CharacterSelectPanel from './components/CharacterSelectPanel';
import ComparisonTable from './components/ComparisonTable';

const MAX_CHARACTERS = 10;

const Comparison = () => {
  const { t } = useTranslation();
  const allHeroes = useAppSelector(selectHeroesData);

  const [selectedHeroIds, setSelectedHeroIds] = useState<number[]>([]);
  const [isHighlightDifferences, setIsHighlightDifferences] = useState(false);

  const selectedHeroes = useMemo(() => {
    return selectedHeroIds
      .map((id) => allHeroes.find((hero) => hero.id === id))
      .filter((hero): hero is HeroType => hero !== undefined);
  }, [selectedHeroIds, allHeroes]);

  const handleAddHero = (heroId: number) => {
    if (selectedHeroIds.length >= MAX_CHARACTERS) return;
    if (selectedHeroIds.includes(heroId)) return;
    setSelectedHeroIds((prev) => [...prev, heroId]);
  };

  const handleRemoveHero = (heroId: number) => {
    setSelectedHeroIds((prev) => prev.filter((id) => id !== heroId));
  };

  const handleClearAll = () => {
    setSelectedHeroIds([]);
  };

  return (
    <div className='flex h-full flex-col'>
      <DynamicTitle title={t('comparison:title')} />

      <div className='mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <CharacterSelectPanel
          heroes={allHeroes}
          selectedHeroIds={selectedHeroIds}
          maxCharacters={MAX_CHARACTERS}
          onAddHero={handleAddHero}
          onRemoveHero={handleRemoveHero}
          onClearAll={handleClearAll}
        />

        <div className='flex items-center gap-3'>
          <Switch
            id='highlight-differences'
            checked={isHighlightDifferences}
            onCheckedChange={setIsHighlightDifferences}
            disabled={selectedHeroes.length < 2}
          />
          <Label
            htmlFor='highlight-differences'
            className='cursor-pointer text-sm'
          >
            {t('comparison:highlightDifferences')}
          </Label>
        </div>
      </div>

      <AnimatePresence mode='wait'>
        {selectedHeroes.length === 0 ? (
          <motion.div
            key='empty'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className='flex flex-1 flex-col items-center justify-center gap-4 text-muted-foreground'
          >
            <div className='text-6xl'>⚔️</div>
            <p className='text-lg'>{t('comparison:noCharacters')}</p>
          </motion.div>
        ) : (
          <motion.div
            key='table'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='flex-1 overflow-hidden'
          >
            <ComparisonTable
              heroes={selectedHeroes}
              isHighlightDifferences={isHighlightDifferences}
              onRemoveHero={handleRemoveHero}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Comparison;

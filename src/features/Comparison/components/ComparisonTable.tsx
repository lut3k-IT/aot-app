'use client';

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import CharacterPicture from '@/components/ui/CharacterPicture';
import { ScrollArea, ScrollBar } from '@/components/ui/ScrollArea';
import { HeroType } from '@/constants/types';
import mbti from '@/data/mbti';
import residences from '@/data/residences';
import species from '@/data/species';
import statuses from '@/data/statuses';
import { getHeroImageSource } from '@/utils/dataHelpers';

interface ComparisonTableProps {
  heroes: HeroType[];
  isHighlightDifferences: boolean;
  onRemoveHero: (heroId: number) => void;
}

type AttributeKey = 'status' | 'species' | 'age' | 'height' | 'weight' | 'residence' | 'mbti' | 'alias';

interface AttributeConfig {
  key: AttributeKey;
  labelKey: string;
  getValue: (hero: HeroType, t: (key: string) => string) => string;
  getRawValue: (hero: HeroType) => string | number | null;
}

const attributeConfigs: AttributeConfig[] = [
  {
    key: 'status',
    labelKey: 'data:attributes.status',
    getValue: (hero, t) => {
      const status = statuses.find((s) => s.id === hero.status);
      return status ? t(`data:status.${status.keyName}.long`) : '-';
    },
    getRawValue: (hero) => hero.status
  },
  {
    key: 'species',
    labelKey: 'data:attributes.species',
    getValue: (hero, t) => {
      const s = species.find((sp) => sp.id === hero.species);
      return s ? t(`data:species.${s.keyName}`) : '-';
    },
    getRawValue: (hero) => hero.species
  },
  {
    key: 'age',
    labelKey: 'data:attributes.age',
    getValue: (hero) => (hero.age !== null ? `${hero.age}` : '-'),
    getRawValue: (hero) => hero.age
  },
  {
    key: 'height',
    labelKey: 'data:attributes.height',
    getValue: (hero) => (hero.height !== null ? `${hero.height} cm` : '-'),
    getRawValue: (hero) => hero.height
  },
  {
    key: 'weight',
    labelKey: 'data:attributes.weight',
    getValue: (hero) => (hero.weight !== null ? `${hero.weight} kg` : '-'),
    getRawValue: (hero) => hero.weight
  },
  {
    key: 'residence',
    labelKey: 'data:attributes.residence',
    getValue: (hero, t) => {
      const r = residences.find((res) => res.id === hero.residence);
      return r ? t(`data:location.${r.keyName}`) : '-';
    },
    getRawValue: (hero) => hero.residence
  },
  {
    key: 'mbti',
    labelKey: 'data:attributes.mbti',
    getValue: (hero) => {
      const m = mbti.find((mb) => mb.id === hero.mbti);
      return m ? m.shortName : '-';
    },
    getRawValue: (hero) => hero.mbti
  },
  {
    key: 'alias',
    labelKey: 'data:attributes.alias',
    getValue: (hero) => (hero.alias.length > 0 ? hero.alias.join(', ') : '-'),
    getRawValue: (hero) => (hero.alias.length > 0 ? hero.alias.join(',') : null)
  }
];

const ComparisonTable = ({ heroes, isHighlightDifferences, onRemoveHero }: ComparisonTableProps) => {
  const { t } = useTranslation();

  const differencesByAttribute = useMemo(() => {
    if (!isHighlightDifferences || heroes.length < 2) return {};

    const differences: Record<AttributeKey, boolean> = {} as Record<AttributeKey, boolean>;

    attributeConfigs.forEach((config) => {
      const values = heroes.map((hero) => config.getRawValue(hero));
      const uniqueValues = new Set(values.map((v) => String(v)));
      differences[config.key] = uniqueValues.size > 1;
    });

    return differences;
  }, [heroes, isHighlightDifferences]);

  const getHighlightClass = (attributeKey: AttributeKey): string => {
    if (!isHighlightDifferences || heroes.length < 2) return '';
    return differencesByAttribute[attributeKey] ? 'bg-primary/10 dark:bg-primary/20' : '';
  };

  return (
    <ScrollArea className='h-full w-full'>
      <div className='flex gap-4 pb-4'>
        {heroes.map((hero, index) => (
          <motion.div
            key={hero.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ delay: index * 0.05 }}
            className='comparison-card relative flex w-52 flex-shrink-0 flex-col rounded-lg border bg-card p-4'
          >
            <Button
              variant='ghost'
              size='icon'
              className='absolute right-1 top-1 h-6 w-6 text-muted-foreground hover:text-destructive'
              onClick={() => onRemoveHero(hero.id)}
              aria-label={t('comparison:removeCharacter')}
            >
              <X className='h-4 w-4' />
            </Button>

            <div className='mb-4 flex flex-col items-center'>
              <CharacterPicture
                imgSource={getHeroImageSource(hero.slug)}
                alt={`${hero.firstName} ${hero.lastName || ''}`}
                size='lg'
                variant='circle'
                className='border-2 border-border'
              />
              <h3 className='mt-3 text-center text-sm font-semibold'>{hero.firstName}</h3>
              {hero.lastName && <p className='text-center text-xs text-muted-foreground'>{hero.lastName}</p>}
            </div>

            <div className='flex flex-col gap-2'>
              {attributeConfigs.map((config) => (
                <div
                  key={config.key}
                  className={`rounded-md px-2 py-1.5 transition-colors ${getHighlightClass(config.key)}`}
                >
                  <div className='text-xs text-muted-foreground'>{t(config.labelKey)}</div>
                  <div className='text-sm font-medium'>{config.getValue(hero, t)}</div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  );
};

export default ComparisonTable;

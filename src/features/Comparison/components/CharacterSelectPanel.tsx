'use client';

import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Trash2, X } from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import CharacterPicture from '@/components/ui/CharacterPicture';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/Command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import { HeroType } from '@/constants/types';
import { getHeroImageSource } from '@/utils/dataHelpers';

interface CharacterSelectPanelProps {
  heroes: HeroType[];
  selectedHeroIds: number[];
  maxCharacters: number;
  onAddHero: (heroId: number) => void;
  onRemoveHero: (heroId: number) => void;
  onClearAll: () => void;
}

const CharacterSelectPanel = ({
  heroes,
  selectedHeroIds,
  maxCharacters,
  onAddHero,
  onRemoveHero,
  onClearAll
}: CharacterSelectPanelProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const availableHeroes = useMemo(() => {
    return heroes.filter((hero) => !selectedHeroIds.includes(hero.id));
  }, [heroes, selectedHeroIds]);

  const filteredHeroes = useMemo(() => {
    if (!searchQuery) return availableHeroes;
    const query = searchQuery.toLowerCase();
    return availableHeroes.filter((hero) => {
      const fullName = `${hero.firstName} ${hero.lastName || ''}`.toLowerCase();
      return fullName.includes(query);
    });
  }, [availableHeroes, searchQuery]);

  const selectedHeroes = useMemo(() => {
    return selectedHeroIds
      .map((id) => heroes.find((hero) => hero.id === id))
      .filter((hero): hero is HeroType => hero !== undefined);
  }, [selectedHeroIds, heroes]);

  const isLimitReached = selectedHeroIds.length >= maxCharacters;

  const handleSelectHero = (heroId: number) => {
    onAddHero(heroId);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className='flex flex-wrap items-center gap-3'>
      <Popover
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            size='sm'
            disabled={isLimitReached}
            className='gap-2'
          >
            <Plus className='h-4 w-4' />
            {t('comparison:addCharacter')}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='w-72 p-0'
          align='start'
        >
          <Command shouldFilter={false}>
            <CommandInput
              placeholder={t('common:filter.searchPlaceholder')}
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandList>
              <CommandEmpty>{t('common:error.notFound')}</CommandEmpty>
              <CommandGroup>
                {filteredHeroes.slice(0, 50).map((hero) => (
                  <CommandItem
                    key={hero.id}
                    value={`${hero.firstName} ${hero.lastName || ''}`}
                    onSelect={() => handleSelectHero(hero.id)}
                    onClick={() => handleSelectHero(hero.id)}
                    className='flex cursor-pointer items-center gap-3'
                  >
                    <CharacterPicture
                      imgSource={getHeroImageSource(hero.slug)}
                      alt={hero.firstName}
                      size='xs'
                      variant='circle'
                    />
                    <span>
                      {hero.firstName} {hero.lastName || ''}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Badge
        variant='outline'
        className='gap-1.5 py-1'
      >
        {selectedHeroIds.length}/{maxCharacters}
      </Badge>

      {selectedHeroes.length > 0 && (
        <>
          <div className='hidden flex-wrap gap-2 sm:flex'>
            {selectedHeroes.map((hero) => (
              <Badge
                key={hero.id}
                variant='secondary'
                className='gap-1.5 py-1 pl-1 pr-2'
              >
                <CharacterPicture
                  imgSource={getHeroImageSource(hero.slug)}
                  alt={hero.firstName}
                  size='2xs'
                  variant='circle'
                />
                <span className='max-w-24 truncate text-xs'>{hero.firstName}</span>
                <button
                  onClick={() => onRemoveHero(hero.id)}
                  className='ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20'
                  aria-label={t('comparison:removeCharacter')}
                >
                  <X className='h-3 w-3' />
                </button>
              </Badge>
            ))}
          </div>

          <Button
            variant='ghost'
            size='sm'
            onClick={onClearAll}
            className='gap-2 text-muted-foreground hover:text-destructive'
          >
            <Trash2 className='h-4 w-4' />
            <span className='hidden sm:inline'>{t('common:action.resetAll')}</span>
          </Button>
        </>
      )}

      {isLimitReached && <span className='text-xs text-muted-foreground'>{t('comparison:limitReached')}</span>}
    </div>
  );
};

export default CharacterSelectPanel;

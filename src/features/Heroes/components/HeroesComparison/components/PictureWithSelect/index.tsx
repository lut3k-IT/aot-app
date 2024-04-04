import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, MousePointerSquare } from 'lucide-react';

import CharacterPicture from '@/components/ui/CharacterPicture';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/Command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import { cn } from '@/lib/utils';

import { HeroForSelect, HeroTypeSelected } from '../..';

interface PictureWithSelectProps {
  componentId: number;
  heroesForSelect: HeroForSelect[];
  selectedHero?: HeroTypeSelected;
  onSelectHero: (chosenHero: HeroForSelect, columnId: number) => void;
  className?: string;
}

const PictureWithSelect = (props: PictureWithSelectProps) => {
  const { componentId, heroesForSelect, selectedHero, onSelectHero, className } = props;
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { t } = useTranslation();

  const characterPicture = (
    <button
      aria-label={t('common:action.select.hero')}
      className={cn('focus-visible-styles max-h-[8rem] w-full max-w-[8rem] rounded-full', className)}
    >
      <CharacterPicture
        imgSource={selectedHero ? `/assets/img/heroes/${selectedHero.id}.jpg` : undefined}
        alt={selectedHero?.firstName || 'Hero'}
        size={'full'}
        variant={'circle'}
        className={'max-h-[8rem] max-w-[8rem] outline-dashed outline-2 outline-offset-4 outline-muted2'}
      />
    </button>
  );

  const emptyPicture = (
    <button
      aria-label={t('common:action.select.hero')}
      className={cn('focus-visible-styles max-h-[8rem] w-full max-w-[8rem] rounded-full', className)}
    >
      <div
        className={
          'flex-center aspect-square h-auto w-full flex-col gap-1 rounded-full bg-accent text-muted-foreground outline-dashed outline-2 outline-offset-4 outline-muted2'
        }
      >
        <MousePointerSquare size={'2.5rem'} />
        {/* todo: t() */}
        <div className={'leading-none'}>Select</div>
      </div>
    </button>
  );

  return (
    <Popover
      open={isPopoverOpen}
      onOpenChange={setIsPopoverOpen}
    >
      <PopoverTrigger asChild>{selectedHero ? characterPicture : emptyPicture}</PopoverTrigger>
      <PopoverContent
        className='w-[12.5rem] p-0'
        sideOffset={16}
      >
        <Command>
          <CommandInput placeholder='Search hero...' />
          {/* todo: t() */}
          <CommandEmpty>No hero found.</CommandEmpty>
          <CommandGroup className={'max-h-56 overflow-y-auto'}>
            {heroesForSelect.map((hero) => (
              <CommandItem
                key={hero.id}
                value={hero.value}
                onSelect={() => {
                  onSelectHero(hero, componentId);
                  setIsPopoverOpen(false);
                }}
              >
                {selectedHero && (
                  <Check className={cn('mr-2 h-4 w-4', selectedHero.id === hero.id ? 'opacity-100' : 'opacity-0')} />
                )}
                {hero.value}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default PictureWithSelect;

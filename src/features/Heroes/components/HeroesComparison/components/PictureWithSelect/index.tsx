import React, { useState } from 'react';
import { Check, MousePointerSquare } from 'lucide-react';

import CharacterPicture from '@/components/ui/CharacterPicture';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/Command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import { HeroType } from '@/constants/types';
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

  const characterPicture = (
    <button className={cn('focus-visible-styles max-h-[8rem] w-full max-w-[8rem] rounded-full', className)}>
      <CharacterPicture
        imgSource={selectedHero ? `/assets/img/heroes/${selectedHero.id}.jpg` : undefined}
        size={'full'}
        variant={'circle'}
        className={
          'max-h-[8rem] max-w-[8rem] outline-dashed outline-2 outline-offset-4 outline-neutral-300 dark:outline-neutral-700'
        }
      />
    </button>
  );

  const emptyPicture = (
    <button className={cn('focus-visible-styles max-h-[8rem] w-full max-w-[8rem] rounded-full', className)}>
      <div
        className={
          'flex-center aspect-square h-auto w-full flex-col gap-1 rounded-full bg-accent text-muted-foreground outline-dashed outline-2 outline-offset-4 outline-neutral-300 dark:outline-neutral-700'
        }
      >
        <MousePointerSquare size={'2.5rem'} />
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
          <CommandEmpty>No hero found.</CommandEmpty>
          <CommandGroup>
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

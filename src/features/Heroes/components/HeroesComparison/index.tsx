import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MousePointerSquare } from 'lucide-react';

import AppHelmet from '@/components/ui/AppHelmet';
import CharacterPicture from '@/components/ui/CharacterPicture';
import { Command, CommandEmpty, CommandGroup, CommandInput } from '@/components/ui/Command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';

interface DetailItemProps {
  title: string;
  value?: React.ReactNode;
  isOdd?: boolean;
}

interface PictureWithSelectProps {
  data?: string;
}

const RowHighlighter = () => (
  <div className={'w-screen-pad absolute left-0 top-0 -z-10 h-[130%] -translate-y-[15%] rounded-md bg-accent'} />
);

const DetailItem = (props: DetailItemProps) => {
  const { title, value = '-', isOdd } = props;

  return (
    <div className={'flex-center relative w-full flex-col'}>
      <div className={'text-lg font-bold leading-none text-muted-foreground'}>{title}</div>
      <div className={'text-xl'}>{value}</div>
      {isOdd && <RowHighlighter />}
    </div>
  );
};

const PictureWithSelect = (props: PictureWithSelectProps) => {
  const { data } = props;
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // FIXME: accessibility outline is orange instead of red

  const characterPicture = (
    <button>
      <CharacterPicture
        imgSource={'https://github.com/shadcn.png'}
        size={'full'}
        variant={'circle'}
        className={'max-h-[8rem] max-w-[8rem]'}
      />
    </button>
  );

  const emptyPicture = (
    <button className={'max-h-[8rem] w-full max-w-[8rem]'}>
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
      <PopoverTrigger asChild>{data ? characterPicture : emptyPicture}</PopoverTrigger>
      <PopoverContent
        className='w-[12.5rem] p-0'
        sideOffset={16}
      >
        <Command>
          <CommandInput placeholder='Search hero...' />
          <CommandEmpty>No hero found.</CommandEmpty>
          <CommandGroup>
            {/* {heroesFromRedux.map((hero) => (
                <CommandItem
                  key={hero.id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check className={cn('mr-2 h-4 w-4', value === hero.value ? 'opacity-100' : 'opacity-0')} />
                  {hero.label}
                </CommandItem>
              ))} */}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const HeroesComparison = () => {
  const [characterList, setCharacterList] = useState([{}]);
  const { t } = useTranslation();

  return (
    <div className={'mt-4 grid w-full grid-cols-2 gap-2'}>
      <AppHelmet title={`${t('common:title.heroes')} ${t('common:tab.comparison')}`} />
      <div className={'flex-center flex-col gap-8'}>
        <PictureWithSelect />
        <div className={'flex-center w-full flex-col gap-4'}>
          <DetailItem
            title={'First name'}
            value={'Eren'}
            isOdd
          />
          <DetailItem
            title={'Last name'}
            value={'Yeager'}
          />
          <DetailItem
            title={'MBTI'}
            value={'INFJ'}
            isOdd
          />
          <DetailItem
            title={'Last name'}
            value={'Yeager'}
          />
          <DetailItem
            title={'MBTI'}
            value={'INFJ'}
            isOdd
          />
        </div>
      </div>
      <div className={'flex-center flex-col gap-8'}>
        <PictureWithSelect />
        <div className={'flex-center w-full flex-col gap-4'}>
          <DetailItem
            title={'First name'}
            value={'Eren'}
          />
          <DetailItem
            title={'Last name'}
            value={'Yeager'}
          />
          <DetailItem
            title={'MBTI'}
            value={'INFJ'}
          />
          <DetailItem
            title={'Last name'}
            value={'Yeager'}
          />
          <DetailItem
            title={'MBTI'}
            value={'INFJ'}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroesComparison;

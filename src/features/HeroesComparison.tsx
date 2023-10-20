import CharacterPicture from '@/components/ui/CharacterPicture';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MousePointerSquare } from 'lucide-react';
import React, { useState } from 'react';

interface DetailItemProps {
  title: string;
  value?: React.ReactNode;
  isOdd?: boolean;
}

interface PictureWithSelectProps {
  data?: string;
}

const RowHighlighter = () => (
  <div className={'absolute left-0 top-0 w-screen-pad h-[130%] -translate-y-[15%] bg-accent rounded-md -z-10'} />
);

const DetailItem = (props: DetailItemProps) => {
  const { title, value = '-', isOdd } = props;

  return (
    <div className={'flex-center flex-col w-full relative'}>
      <div className={'text-lg font-bold text-muted-foreground leading-none'}>{title}</div>
      <div className={'text-xl'}>{value}</div>
      {isOdd && <RowHighlighter />}
    </div>
  );
};

const PictureWithSelect = (props: PictureWithSelectProps) => {
  const { data } = props;
  const [open, setOpen] = useState(false);

  // FIXME: accessibility outline is orange instead of red

  const characterPicture = (
    <button>
      <CharacterPicture
        imgSource={'https://github.com/shadcn.png'}
        size={'full'}
        variant={'circle'}
        className={'max-w-[128px] max-h-[128px]'}
      />
    </button>
  );

  const emptyPicture = (
    <button className={'w-full max-w-[128px] max-h-[128px]'}>
      <div
        className={
          'w-full h-auto aspect-square rounded-full bg-accent flex-center flex-col gap-1 text-muted-foreground outline-2 outline-dashed outline-offset-4 outline-neutral-300 dark:outline-neutral-700'
        }
      >
        <MousePointerSquare size={'40px'} />
        <div className={'leading-none'}>Select</div>
      </div>
    </button>
  );

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>{data ? characterPicture : emptyPicture}</PopoverTrigger>
      <PopoverContent
        className='w-[200px] p-0'
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

  return (
    <div className={'w-full grid grid-cols-2 gap-2 mt-4'}>
      <div className={'flex-center flex-col gap-8'}>
        <PictureWithSelect />
        <div className={'flex-center flex-col gap-4 w-full'}>
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
        <div className={'flex-center flex-col gap-4 w-full'}>
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

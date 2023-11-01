import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserPlus } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/DropdownMenu';
import { Slider } from '@/components/ui/Slider';

interface FilterProps {}

// TODO: filter has to be a modal
// TODO: make an indicator to show filtering is active

const Filter = (props: FilterProps) => {
  const {} = props;
  const { t } = useTranslation();

  const [status, setStatus] = useState<number>();
  const [age, setAge] = useState([0, 75]);
  const [height, setHeight] = useState([100, 700]);
  const [weight, setWeight] = useState([40, 150]);
  const [mbti, setMbti] = useState<number[]>([]);
  const [species, setSpecies] = useState<number[]>([]);
  const [residence, setResidence] = useState<number[]>([]);
  const [hasAge, setHasAge] = useState<boolean>();
  const [hasHeight, setHasHeight] = useState<boolean>();
  const [hasWeight, setHasWeight] = useState<boolean>();

  const sliderContainerCn = '';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          iconSize={'sm'}
          iconPosition={'right'}
          iconName={'filter'}
          variant={'outline'}
          className={'text-muted-foreground'}
          iconProps={{ className: 'text-muted-foreground' }}
        >
          {t('common:filter.title')}
        </Button>
      </DropdownMenuTrigger>
      {/* --------------------------------- status -------------------------------- */}
      <DropdownMenuContent align={'end'}>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <UserPlus className='mr-2 h-4 w-4' />
            <span>{t('data:status.title')}</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuCheckboxItem
              //  checked={showActivityBar}
              //  onCheckedChange={setShowActivityBar}
              //  disabled
              >
                {t('data:status.alive.long')}
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>{t('data:status.dead.long')}</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>{t('data:status.unknown.long')}</DropdownMenuCheckboxItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        {/* --------------------------------- age -------------------------------- */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <UserPlus className='mr-2 h-4 w-4' />
            <span>{t('data:age.title')}</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className={'min-h-[100px] py-6'}>
              <Slider
                defaultValue={age}
                onValueChange={(v: number[]) => setAge(v)}
                min={0}
                max={75}
                step={1}
                minStepsBetweenThumbs={1}
              />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        {/* --------------------------------- height -------------------------------- */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <span>{t('data:height.title')}</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className={'min-h-[100px] py-6'}>
              <Slider
                defaultValue={height}
                onValueChange={(v: number[]) => setHeight(v)}
                min={100}
                max={700}
                step={10}
                minStepsBetweenThumbs={1}
              />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        {/* --------------------------------- weight -------------------------------- */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <span>{t('data:weight.title')}</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className={'min-h-[100px] py-6'}>
              <Slider
                defaultValue={weight}
                onValueChange={(v: number[]) => setWeight(v)}
                min={40}
                max={150}
                step={5}
                minStepsBetweenThumbs={1}
              />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        {/* --------------------------------- mbti -------------------------------- */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <span>{t('data:mbti.title')}</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {/* TODO: map here */}
              <DropdownMenuCheckboxItem>{t('data:mbti.advocate')}</DropdownMenuCheckboxItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        {/* --------------------------------- species -------------------------------- */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <span>{t('data:species.title')}</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {/* TODO: map here */}
              <DropdownMenuCheckboxItem>{t('data:species.human')}</DropdownMenuCheckboxItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        {/* <DropdownMenuRadioGroup
        // value={position}
        // onValueChange={setPosition}
        >
          <DropdownMenuRadioItem value='all'>All</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='favorites'>Favorites</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='noFavorites'>Not favorites</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Filter;

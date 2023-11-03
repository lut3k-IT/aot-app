import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { v4 } from 'uuid';

import { Button } from '@/components/ui/Button';
import { RoutePath } from '@/constants/enums';

import ButtonGoBack from '../../components/ui/ButtonGoBack';
import CharacterPicture from '../../components/ui/CharacterPicture';

interface GridRowProps {
  title: string;
  value?: React.ReactNode;
}

const GridRow = (props: GridRowProps) => {
  const { title, value = '-' } = props;

  return (
    <>
      <div
        className={
          'w-full bg-muted text-muted-foreground text-md uppercase px-2 py-0.5 rounded-md text-center font-bold'
        }
      >
        {title}
      </div>
      <div className={'w-full self-center text-lg'}>{value}</div>
    </>
  );
};

const HeroDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const isFavorite = true;

  const tempObj = [
    {
      key: 'residence',
      value: 'Wall Rose'
    },
    {
      key: 'mbti',
      value: 'INFJ'
    },
    {
      key: 'age',
      value: '28'
    },
    {
      key: 'height',
      value: '162'
    },
    {
      key: 'status',
      value: 'Alive' // There should be a component with prop passed
    }
  ];

  return (
    <div className={'pt-body-pad-start'}>
      <ButtonGoBack fallbackRoute={RoutePath.HEROES_GALLERY} />
      <div className={'flex flex-col items-center mt-6 relative'}>
        <div className={'absolute w-full h-[120px] bg-violet-400 rounded-lg'} />
        <CharacterPicture
          imgSource={'https://staticg.sportskeeda.com/editor/2021/11/5ea8a-16360291439038.png?w=840'}
          size={'xl'}
          variant={'circle'}
          className={'mt-5 border-4 border-background'}
        />
      </div>
      <div className={'w-full text-center mt-2 font-semibold text-2xl'}>Mikasa Ackerman</div>
      <div className={'grid grid-cols-[minmax(100px,_120px)_minmax(120px,_2fr)] mt-6 gap-x-4 gap-y-3 items-start'}>
        {tempObj.map((obj) => (
          <GridRow
            title={obj.key}
            value={obj.value}
            key={v4()}
          />
        ))}
      </div>
      <div className={'flex-center'}>
        <Button
          className={'mt-8 w-full max-w-[500px]'}
          iconName={'heart'}
          variant={isFavorite ? 'secondary' : 'default'}
          iconProps={{ isFilled: isFavorite, className: isFavorite ? 'text-red-500 fill-red-500' : '' }}
        >
          {isFavorite ? t('common:action.removeFromFavorites') : t('common:action.addToFavorites')}
        </Button>
      </div>
    </div>
  );
};

export default HeroDetails;

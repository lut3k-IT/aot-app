import CharacterPicture from '@/components/ui/CharacterPicture';
import React from 'react';

interface DetailItemProps {
  title: string;
  value?: React.ReactNode;
  isOdd?: boolean;
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

const HeroesComparison = () => {
  return (
    <div className={'w-full grid grid-cols-2 gap-2 mt-4'}>
      <div className={'flex-center flex-col gap-8'}>
        <CharacterPicture
          imgSource={''}
          size={'full'}
          variant={'circle'}
          className={'max-w-[128px]'}
        />
        <div className={'flex-center flex-col gap-4 w-full'}>
          <DetailItem
            title={'First name'}
            value={'Eren'}
            isOdd
          />
          <DetailItem
            title={'Last name'}
            value={'Yaeger'}
          />
          <DetailItem
            title={'MBTI'}
            value={'INFJ'}
            isOdd
          />
          <DetailItem
            title={'Last name'}
            value={'Yaeger'}
          />
          <DetailItem
            title={'MBTI'}
            value={'INFJ'}
            isOdd
          />
          <DetailItem
            title={'Last name'}
            value={'Yaeger'}
          />
          <DetailItem
            title={'MBTI'}
            value={'INFJ'}
            isOdd
          />
          <DetailItem
            title={'Last name'}
            value={'Yaeger'}
          />
          <DetailItem
            title={'MBTI'}
            value={'INFJ'}
            isOdd
          />
        </div>
      </div>
      <div className={'flex-center flex-col gap-8'}>
        <CharacterPicture
          imgSource={''}
          size={'full'}
          variant={'circle'}
          className={'max-w-[128px]'}
        />
        <div className={'flex-center flex-col gap-4 w-full'}>
          <DetailItem
            title={'First name'}
            value={'Eren'}
          />
          <DetailItem
            title={'Last name'}
            value={'Yaeger'}
          />
          <DetailItem
            title={'MBTI'}
            value={'INFJ'}
          />
          <DetailItem
            title={'Last name'}
            value={'Yaeger'}
          />
          <DetailItem
            title={'MBTI'}
            value={'INFJ'}
          />
          <DetailItem
            title={'Last name'}
            value={'Yaeger'}
          />
          <DetailItem
            title={'MBTI'}
            value={'INFJ'}
          />
          <DetailItem
            title={'Last name'}
            value={'Yaeger'}
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

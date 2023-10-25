import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';

import { CharacterType, RoutePath } from '@/constants/enums';
import { HeroType } from '@/constants/types';
import residences from '@/data/residences';

import CharacterPicture from './CharacterPicture';
import HeartButton from './HeartButton';
import MbtiFrame from './MbtiFrame';

interface CharacterCardProps {
  data: HeroType;
  type: CharacterType;
}

const tempId = 123;

const CharacterCard = (props: CharacterCardProps) => {
  const { data, type = CharacterType.HERO } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const cnContainer = 'flex gap-4 h-[108px]';
  const cnDetailBox = 'flex flex-col justify-between items-center gap-1';
  const cnDetailTitle = 'text-sm font-medium text-muted-foreground leading-none';
  const cnDetailValue = 'text-lg font-semibold leading-none';

  const conditionalRoute = type === CharacterType.HERO ? RoutePath.HERO_DETAILS : RoutePath.TITAN_DETAILS;

  const showedDetails = [
    {
      title: 'Age',
      value: data.age
    },
    {
      title: 'Height',
      value: data.height
    },
    {
      title: 'Status',
      value: data.status
    }
  ];

  const DetailsBoxes = () =>
    showedDetails.map((detail) => (
      <div
        className={cnDetailBox}
        key={v4()}
      >
        <div className={cnDetailTitle}>{detail.title}</div>
        <div className={cnDetailValue}>{detail.value || '-'}</div>
      </div>
    ));

  const residenceKeyName = residences.find((res) => res.id === data.residence)?.keyName;
  const residenceName = residenceKeyName ? t(`data:residence.${residenceKeyName}`) : '';

  return (
    <div className={cnContainer}>
      <MbtiFrame onClick={() => navigate(`${conditionalRoute}/${tempId}`)}>
        <CharacterPicture
          imgSource={''}
          variant={'roundedBtm'}
        />
      </MbtiFrame>
      <div className={'flex flex-col flex-1 justify-between'}>
        <div className={'w-full flex flex-col gap-1 mt-0.5 relative'}>
          <div className={'text-lg leading-none font-medium pr-10'}>{`${data.firstName} ${data.lastName}`}</div>
          <div className={'text-sm leading-none font-medium text-muted-foreground pr-10 capitalize'}>
            {residenceName}
          </div>
          <HeartButton className={'absolute top-0 right-0'} />
        </div>
        <div className={'flex items-center justify-center px-4 gap-8 w-full h-[52px] bg-accent rounded-md'}>
          <DetailsBoxes />
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;

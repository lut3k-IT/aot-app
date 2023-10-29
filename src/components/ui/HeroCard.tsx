import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';

import { RoutePath } from '@/constants/enums';
import { HeroType } from '@/constants/types';
import { getResidenceName } from '@/utils/dataProcessing';

import CharacterPicture from './CharacterPicture';
import HeartButton from './HeartButton';
import HeroStatus from './HeroStatus';
import MbtiFrame from './MbtiFrame';

interface HeroCardProps {
  data: HeroType;
}

const HeroCard = (props: HeroCardProps) => {
  const { data } = props;
  const navigate = useNavigate();

  const cnContainer = 'flex gap-4 h-[108px]';
  const cnDetailBox = 'flex flex-col justify-between items-center gap-1';
  const cnDetailTitle = 'text-sm font-medium text-muted-foreground leading-none';
  const cnDetailValue = 'text-lg font-semibold leading-none';

  const residenceName = getResidenceName(data.residence);

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
      value: <HeroStatus statusId={data.status} />
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

  const handleToggleFavorite = () => {};

  return (
    <div className={cnContainer}>
      <MbtiFrame
        mbtiId={data.mbti}
        onClick={() => navigate(`${RoutePath.HERO_DETAILS}/${data.id}`)}
      >
        <CharacterPicture
          imgSource={`/assets/img/heroes/${data.id}.jpg`}
          variant={'roundedBtm'}
        />
      </MbtiFrame>
      <div className={'flex flex-col flex-1 justify-between'}>
        <div className={'w-full flex flex-col gap-1 mt-0.5 relative'}>
          <div className={'text-lg leading-none font-medium pr-10'}>{`${data.firstName || ''} ${
            data.lastName || ''
          }`}</div>
          <div className={'text-sm leading-none font-medium text-muted-foreground pr-10 capitalize'}>
            {residenceName}
          </div>
          <HeartButton
            className={'absolute top-0 right-0'}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>
        <div className={'flex items-center justify-center px-4 gap-8 w-full h-[52px] bg-accent rounded-md'}>
          <DetailsBoxes />
        </div>
      </div>
    </div>
  );
};

export default HeroCard;

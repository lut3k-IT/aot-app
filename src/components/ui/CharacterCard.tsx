import { useNavigate } from 'react-router-dom';

import { CharacterType, RoutePath } from '@/constants';

import CharacterPicture from './CharacterPicture';
import HeartButton from './HeartButton';
import MbtiFrame from './MbtiFrame';

interface CharacterCardProps {
  type: CharacterType;
}

const tempId = 123;

const CharacterCard = (props: CharacterCardProps) => {
  const { type = CharacterType.HERO } = props;
  const navigate = useNavigate();

  const cnContainer = 'flex gap-4 h-[108px]';
  const cnDetailBox = 'flex flex-col justify-between items-center gap-1';
  const cnDetailTitle = 'text-sm font-medium text-muted-foreground leading-none';
  const cnDetailValue = 'text-lg font-semibold leading-none';

  const conditionalRoute = type === CharacterType.HERO ? RoutePath.HERO_DETAILS : RoutePath.TITAN_DETAILS;

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
          <div className={'text-lg leading-none font-medium pr-10'}>Eren Yeager</div>
          <div className={'text-sm leading-none font-medium text-muted-foreground pr-10'}>Wall Rose</div>
          <HeartButton className={'absolute top-0 right-0'} />
        </div>
        <div className={'flex items-center justify-center px-4 gap-8 w-full h-[52px] bg-accent rounded-md'}>
          <div className={cnDetailBox}>
            <div className={cnDetailTitle}>Age</div>
            <div className={cnDetailValue}>22</div>
          </div>
          <div className={cnDetailBox}>
            <div className={cnDetailTitle}>Height</div>
            <div className={cnDetailValue}>168</div>
          </div>
          <div className={cnDetailBox}>
            <div className={cnDetailTitle}>Status</div>
            <div className={cnDetailValue}>Alive</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;

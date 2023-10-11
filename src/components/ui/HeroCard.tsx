import CharacterPicture from './CharacterPicture';
import MbtiFrame from './MbtiFrame';

const HeroCard = () => {
  return (
    <div className='flex flex-col gap-4'>
      <MbtiFrame>
        <CharacterPicture
          ulr={''}
          variant={'roundedBtm'}
        />
      </MbtiFrame>
      <MbtiFrame>
        <CharacterPicture
          ulr={''}
          variant={'roundedBtm'}
        />
      </MbtiFrame>
    </div>
  );
};

export default HeroCard;

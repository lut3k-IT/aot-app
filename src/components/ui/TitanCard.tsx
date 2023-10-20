import CharacterPicture from './CharacterPicture';
import HeartButton from './HeartButton';
import MbtiFrame from './MbtiFrame';

interface TitanCardProps {}

const TitanCard = (props: TitanCardProps) => {
  const {} = props;

  return (
    <div className='flex gap-4 h-[108px]'>
      <MbtiFrame>
        <CharacterPicture
          imgSource={''}
          variant={'roundedBtm'}
        />
      </MbtiFrame>
      <div className={'flex flex-col flex-1 justify-between'}>
        <div className={'w-full flex flex-col gap-1 mt-0.5 relative'}>
          <div className={'text-lg leading-none font-medium pr-10'}>Armored titan</div>
          <div className={'text-sm leading-none font-medium text-muted-foreground pr-10'}>Reiner Braun</div>
          <HeartButton className={'absolute top-0 right-0'} />
        </div>
        <div className={'flex items-center justify-center px-4 gap-8 w-full h-[52px] bg-accent rounded-md'}>
          <div className={'flex flex-col justify-between items-center gap-1'}>
            <div className={'text-sm font-medium text-muted-foreground leading-none'}>Allegiance</div>
            <div className={'text-lg font-semibold leading-none'}>Marley</div>
          </div>
          <div className={'flex flex-col justify-between items-center gap-1'}>
            <div className={'text-sm font-medium text-muted-foreground leading-none'}>Height</div>
            <div className={'text-lg font-semibold leading-none'}>168</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitanCard;

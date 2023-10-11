import HeartButton from './HeartButton';

const QuoteBarMobile = () => {
  return (
    <div className={'flex items-center px-[22px] py-1 gap-2 bg-background border-b'}>
      <div className={'text-sm font-normal italic text-muted-foreground truncate'}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum, nemo voluptatibus. Neque asperiores dolorem
        quasi harum provident quae quos cumque.
      </div>
      <HeartButton />
    </div>
  );
};

export default QuoteBarMobile;

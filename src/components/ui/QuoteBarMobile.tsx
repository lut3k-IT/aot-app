import HeartButton from './HeartButton';

const QuoteBarMobile = () => {
  return (
    <div className={'bg-neutral-900 flex items-center px-6 py-1 gap-2'}>
      <div className={'text-sm font-thin italic text-muted-foreground truncate'}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum, nemo voluptatibus. Neque asperiores dolorem
        quasi harum provident quae quos cumque.
      </div>
      <HeartButton />
    </div>
  );
};

export default QuoteBarMobile;

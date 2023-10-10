import Icon from './icon';

// TODO:
// ts button element
// quote id
// is in favorites (filled icon)

const HeartButton = () => {
  return (
    <button className={'p-1'}>
      <Icon
        size={'sm'}
        name={'heart'}
        variant={'gray'}
      />
    </button>
  );
};

export default HeartButton;

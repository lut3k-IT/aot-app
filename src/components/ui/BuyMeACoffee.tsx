import { CSSProperties } from 'react';

interface BuyMeACoffeeProps {
  className?: string;
}

const BuyMeACoffee = (props: BuyMeACoffeeProps) => {
  const { className } = props;

  const buttonStyle: CSSProperties = {
    height: '45px',
    width: '163px'
  };

  return (
    <a
      href='https://www.buymeacoffee.com/lut3k'
      target='_blank'
      rel='noreferrer'
      className={className}
    >
      <img
        src='https://cdn.buymeacoffee.com/buttons/v2/default-red.png'
        alt='Buy Me A Coffee'
        style={buttonStyle}
      />
    </a>
  );
};

export default BuyMeACoffee;

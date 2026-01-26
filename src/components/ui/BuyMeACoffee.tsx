import Image from 'next/image';

interface BuyMeACoffeeProps {
  className?: string;
}

const BuyMeACoffee = (props: BuyMeACoffeeProps) => {
  const { className } = props;

  return (
    <a
      href='https://www.buymeacoffee.com/lut3k'
      target='_blank'
      rel='noreferrer'
      className={className}
    >
      <Image
        src='https://cdn.buymeacoffee.com/buttons/v2/default-red.png'
        alt='Buy Me A Coffee image'
        width={163}
        height={45}
      />
    </a>
  );
};

export default BuyMeACoffee;

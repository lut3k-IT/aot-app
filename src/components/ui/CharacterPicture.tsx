// TODO:
// numer zdjecia
// typ osobowosci

import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from './Avatar';

const characterPictureVariants = cva('', {
  variants: {
    variant: {
      default: 'rounded-none',
      rounded: 'rounded-md',
      roundedBtm: 'rounded-t-none rounded-b-md',
      circle: 'rounded-full'
    },
    size: {
      md: 'w-[84px] h-[84px]',
      lg: 'w-[96px] h-[96px]',
      xl: 'w-[128px] h-[128px]',
      full: 'w-full h-full'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'md'
  }
});

interface CharacterPictureProps extends VariantProps<typeof characterPictureVariants> {
  imgSource: string;
  className?: string;
}

const CharacterPicture = (props: CharacterPictureProps) => {
  const { imgSource, className, variant, size } = props;

  return (
    <Avatar className={cn(characterPictureVariants({ variant, size }), className)}>
      <AvatarImage src={'https://github.com/shadcn.png'} />
      <AvatarFallback className={cn(characterPictureVariants({ variant, size }))} />
    </Avatar>
  );
};

export default CharacterPicture;

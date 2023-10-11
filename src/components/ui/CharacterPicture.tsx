// numer zdjecia
// typ osobowosci

import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from './avatar';

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
  ulr: string;
}

const CharacterPicture = (props: CharacterPictureProps) => {
  const { variant, size } = props;

  return (
    <div>
      <Avatar className={cn(characterPictureVariants({ variant, size }))}>
        <AvatarImage src={'https://github.com/shadcn.png'} />
        <AvatarFallback className={cn(characterPictureVariants({ variant, size }))} />
      </Avatar>
    </div>
  );
};

export default CharacterPicture;

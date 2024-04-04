import { cva, VariantProps } from 'class-variance-authority';
import { Image } from 'lucide-react';

import { ImageSourceType } from '@/constants/types';
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
      lg: 'w-[128px] h-[128px]',
      xl: 'w-[160px] h-[160px]',
      full: 'w-full h-full'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'md'
  }
});

interface CharacterPictureProps extends VariantProps<typeof characterPictureVariants> {
  imgSource: ImageSourceType;
  alt?: string;
  className?: string;
}

const CharacterPicture = (props: CharacterPictureProps) => {
  const { imgSource, className, variant, size, alt } = props;

  return (
    <Avatar className={cn(characterPictureVariants({ variant, size }), className)}>
      <AvatarImage
        src={imgSource}
        alt={alt}
      />
      <AvatarFallback className={cn(characterPictureVariants({ variant, size }))}>
        <Image className={'h-1/2 w-1/2 text-muted2-foreground'} />
      </AvatarFallback>
    </Avatar>
  );
};

export default CharacterPicture;

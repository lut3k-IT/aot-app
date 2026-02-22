import { cva, VariantProps } from 'class-variance-authority';
import { Image } from 'lucide-react';
import NextImage from 'next/image';

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
      '2xs': 'w-[24px] h-[24px]',
      xs: 'w-[40px] h-[40px]',
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

  let width = 84;
  let height = 84;

  if (size === '2xs') {
    width = 24;
    height = 24;
  } else if (size === 'xs') {
    width = 40;
    height = 40;
  } else if (size === 'lg') {
    width = 128;
    height = 128;
  } else if (size === 'xl') {
    width = 160;
    height = 160;
  }

  const isFull = size === 'full';

  return (
    <Avatar className={cn(characterPictureVariants({ variant, size }), className)}>
      {imgSource ? (
        <AvatarImage
          src={imgSource}
          asChild
        >
          <NextImage
            src={imgSource}
            alt={alt || ''}
            width={isFull ? undefined : width}
            height={isFull ? undefined : height}
            fill={isFull}
            className={'object-cover'}
            priority={size === 'xl'} // Optimize LCP for large avatars
            unoptimized
          />
        </AvatarImage>
      ) : null}
      <AvatarFallback className={cn(characterPictureVariants({ variant, size }))}>
        <Image className={'h-1/2 w-1/2 text-subtle-foreground'} />
      </AvatarFallback>
    </Avatar>
  );
};

export default CharacterPicture;

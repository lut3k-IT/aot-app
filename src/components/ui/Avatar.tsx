import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const avatarVariants = cva('relative flex h-10 w-10 overflow-hidden', {
  variants: {
    variant: {
      circle: 'rounded-full',
      rounded: 'rounded-md',
      square: 'rounded-none'
    }
  },
  defaultVariants: {
    variant: 'circle'
  }
});

const avatarFallbackVariants = cva('relative flex h-full w-full items-center justify-center bg-muted2', {
  variants: {
    variant: {
      circle: 'rounded-full',
      rounded: 'rounded-md',
      square: 'rounded-none'
    }
  },
  defaultVariants: {
    variant: 'circle'
  }
});

interface AvatarProps extends VariantProps<typeof avatarVariants>, React.ComponentProps<typeof AvatarPrimitive.Root> {}

interface AvatarFallbackProps
  extends VariantProps<typeof avatarFallbackVariants>,
    React.ComponentProps<typeof AvatarPrimitive.Fallback> {}

const Avatar = ({ className, variant, ref, ...props }: AvatarProps) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(avatarVariants({ variant }), className)}
    {...props}
  />
);
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = ({ className, ref, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full', className)}
    {...props}
  />
);
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = ({ className, variant, ref, ...props }: AvatarFallbackProps) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(avatarFallbackVariants({ variant }), className)}
    {...props}
  />
);
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarFallback, AvatarImage };

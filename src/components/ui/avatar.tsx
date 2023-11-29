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

interface AvatarProps
  extends VariantProps<typeof avatarVariants>,
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {}

interface AvatarFallbackProps
  extends VariantProps<typeof avatarFallbackVariants>,
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> {}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  // React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
  AvatarProps
>(({ className, variant, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(avatarVariants({ variant }), className)}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full', className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  // React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
  AvatarFallbackProps
>(({ className, variant, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(avatarFallbackVariants({ variant }), className)}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarFallback, AvatarImage };

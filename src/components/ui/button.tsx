import * as React from 'react';
import { Link } from 'react-router-dom';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { RoutePath } from '@/constants';
import { cn } from '@/lib/utils';

import Icon, { IconNames, IconProps, IconSizes } from './icon';

const buttonVariants = cva(
  'inline-flex gap-2 items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  linkTo?: RoutePath | URL;
  iconName?: IconNames;
  iconPosition?: 'left' | 'right';
  iconSize?: IconSizes;
  iconProps?: IconProps;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      linkTo,
      iconName,
      iconPosition = 'left',
      iconSize = 'default',
      iconProps,
      children,
      ...props
    },
    ref
  ) => {
    const MainComponent = asChild ? Slot : 'button';
    const IconComponent = iconName && (
      <Icon
        name={iconName}
        size={iconSize}
        {...iconProps}
      />
    );
    const Content = (
      <>
        {iconPosition === 'left' ? IconComponent : null}
        {children ? children : null}
        {iconPosition === 'right' ? IconComponent : null}
      </>
    );

    const iconBasedClass = children ? (iconName ? (iconPosition === 'left' ? 'pl-3' : 'pr-3') : null) : null;

    const ButtonComponent = (
      <MainComponent
        className={cn(buttonVariants({ variant, size, className }), iconBasedClass)}
        ref={ref}
        {...props}
      >
        {Content}
      </MainComponent>
    );

    return linkTo ? <Link to={linkTo}>{ButtonComponent}</Link> : ButtonComponent;
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };

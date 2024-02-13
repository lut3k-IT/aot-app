import * as React from 'react';
import { Link } from 'react-router-dom';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { ExternalUrl, RoutePath } from '@/constants/enums';
import { cn } from '@/lib/utils';

import Icon, { IconNames, IconProps, IconSizes } from './Icon';

const buttonVariants = cva(
  'inline-flex gap-2 items-center justify-center rounded-md text-sm font-medium whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        defaultInvert:
          'bg-primary-foreground text-primary hover:bg-primary-foreground/70 dark:bg-primary/10 dark:hover:bg-primary/5',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        destructiveInvert:
          'bg-destructive-foreground text-destructive hover:bg-purple-50 dark:bg-purple-900/20 dark:hover:bg-purple-900/10',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        secondaryInvert: 'bg-secondary-foreground text-secondary hover:bg-secondary-foreground/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline',
        proxy: ''
      },
      size: {
        default: 'h-10 px-4 py-2 h-input',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        icon: 'h-10 w-10',
        proxy: 'h-auto p-0'
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
  linkTo?: RoutePath | ExternalUrl;
  iconName?: IconNames;
  iconPosition?: 'left' | 'right';
  iconSize?: IconSizes;
  iconProps?: Partial<IconProps>;
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
      iconSize = 'sm',
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

    let iconBasedClass = null;
    if (children && iconName) {
      switch (size) {
        case 'default':
          iconBasedClass = iconPosition === 'left' ? 'pl-3' : 'pr-3';
          break;
        case 'sm':
          iconBasedClass = iconPosition === 'left' ? 'pl-2.5' : 'pr-2.5';
          break;
        case 'lg':
          iconBasedClass = iconPosition === 'left' ? 'pl-7' : 'pr-7';
          break;
        default:
          break;
      }
    }

    const ButtonComponent = (
      <MainComponent
        className={cn(buttonVariants({ variant, size }), iconBasedClass, className)}
        ref={ref}
        {...props}
      >
        {Content}
      </MainComponent>
    );

    return linkTo ? (
      <Link
        className={'contents'}
        to={linkTo}
      >
        {ButtonComponent}
      </Link>
    ) : (
      ButtonComponent
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };

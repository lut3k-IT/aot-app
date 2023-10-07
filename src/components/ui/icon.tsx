/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { cva } from 'class-variance-authority';
import {
  ArrowDownWideNarrow,
  Dna,
  Filter,
  HelpCircle,
  Loader2,
  LucideIcon,
  Menu,
  Moon,
  PenLine,
  Sun,
  User,
  X
} from 'lucide-react';

import { cn } from '@/lib/utils';

const iconVariants = cva('text-current', {
  variants: {
    size: {
      sm: 'w-5 h-5',
      md: 'w-6 h-6',
      lg: 'w-7 h-7'
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

type IconSizes = 'sm' | 'md' | 'lg';

type IconNames =
  | 'arrowDownWideNarrow'
  | 'dna'
  | 'filter'
  | 'helpCircle'
  | 'loader2'
  | 'menu'
  | 'moon'
  | 'penLine'
  | 'sun'
  | 'user'
  | 'x';

type Icons = Record<IconNames, React.ElementType>;

interface IconProps extends Partial<LucideIcon> {
  name: IconNames;
  size?: IconSizes;
  color?: string;
  isFilled?: boolean;
  className?: string;
}

const Icon = ({ name, size, color, isFilled = false, className, ...props }: IconProps) => {
  const Icons: Icons = {
    arrowDownWideNarrow: ArrowDownWideNarrow,
    dna: Dna,
    filter: Filter,
    helpCircle: HelpCircle,
    loader2: Loader2,
    menu: Menu,
    moon: Moon,
    penLine: PenLine,
    sun: Sun,
    user: User,
    x: X
  };
  const IconComponent = Icons[name];

  const iconClass = cn(
    iconVariants({
      size: size,
      className
    })
  );

  const iconColor = color ? color : 'currentColor';

  return (
    <IconComponent
      className={iconClass}
      color={iconColor}
      fill={isFilled ? iconColor : null}
      {...props}
    />
  );
};

export default Icon;

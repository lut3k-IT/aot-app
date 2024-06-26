import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  ArrowDownNarrowWide,
  ArrowDownWideNarrow,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Dna,
  EyeOff,
  Filter,
  Heart,
  HelpCircle,
  Loader2,
  LucideIcon,
  Menu,
  Moon,
  PenLine,
  Quote,
  Sun,
  User,
  X
} from 'lucide-react';

import { ReactComponent as Aot } from '@/assets/icons/aot-icon.svg';
import { cn } from '@/lib/utils';

const iconVariants = cva('text-current', {
  variants: {
    variant: {
      default: 'text-current',
      gray: 'text-muted2-foreground',
      primary: 'text-primary'
    },
    size: {
      default: 'w-6 h-6',
      xs: 'w-4 h-4',
      sm: 'w-5 h-5',
      lg: 'w-7 h-7'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
});

export type IconSizes = 'default' | 'xs' | 'sm' | 'lg';

export type IconNames =
  | 'arrowDownWideNarrow'
  | 'arrowDownNarrowWide'
  | 'aot'
  | 'heart'
  | 'dna'
  | 'filter'
  | 'helpCircle'
  | 'loader2'
  | 'menu'
  | 'moon'
  | 'penLine'
  | 'sun'
  | 'user'
  | 'x'
  | 'eyeOff'
  | 'quote'
  | 'chevronLeft'
  | 'chevronRight'
  | 'chevronFirst'
  | 'chevronLast';

type Icons = Record<IconNames, React.ElementType>;

export interface IconProps extends Partial<LucideIcon>, VariantProps<typeof iconVariants> {
  name: IconNames;
  color?: string;
  isFilled?: boolean;
  className?: string;
}

const Icon = ({ name, size, variant, color, isFilled = false, className, ...props }: IconProps) => {
  const iconsSet: Icons = {
    arrowDownWideNarrow: ArrowDownWideNarrow,
    arrowDownNarrowWide: ArrowDownNarrowWide,
    aot: Aot,
    heart: Heart,
    dna: Dna,
    filter: Filter,
    helpCircle: HelpCircle,
    loader2: Loader2,
    menu: Menu,
    moon: Moon,
    penLine: PenLine,
    sun: Sun,
    user: User,
    x: X,
    eyeOff: EyeOff,
    quote: Quote,
    chevronLeft: ChevronLeft,
    chevronRight: ChevronRight,
    chevronFirst: ChevronFirst,
    chevronLast: ChevronLast
  };
  const IconComponent = iconsSet[name];

  const iconClass = cn(
    iconVariants({
      size: size,
      variant: variant,
      className
    })
  );

  const iconColor = color ? color : 'currentColor';

  return (
    <IconComponent
      className={iconClass}
      color={iconColor}
      fill={isFilled ? iconColor : 'transparent'}
      {...props}
    />
  );
};

export default Icon;

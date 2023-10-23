import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  ArrowDownWideNarrow,
  ChevronLeft,
  ChevronRight,
  Dna,
  Filter,
  Heart,
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

import { ReactComponent as AotLg } from '@/assets/icons/aot-icon-lg.svg';
import { ReactComponent as AotMd } from '@/assets/icons/aot-icon-md.svg';
import { ReactComponent as AotSm } from '@/assets/icons/aot-icon-sm.svg';
import { cn } from '@/lib/utils';

const iconVariants = cva('text-current', {
  variants: {
    variant: {
      default: 'text-current',
      gray: 'text-neutral-300 dark:text-neutral-400',
      primary: 'text-primary'
    },
    size: {
      default: 'w-6 h-6',
      sm: 'w-5 h-5',
      lg: 'w-7 h-7'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
});

export type IconSizes = 'default' | 'sm' | 'lg';

export type IconNames =
  | 'arrowDownWideNarrow'
  | 'aotSm'
  | 'aotMd'
  | 'aotLg'
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
  | 'chevronLeft'
  | 'chevronRight';

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
    aotSm: AotSm,
    aotMd: AotMd,
    aotLg: AotLg,
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
    chevronLeft: ChevronLeft,
    chevronRight: ChevronRight
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

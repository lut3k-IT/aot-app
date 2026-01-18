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

import AotIcon from '@/assets/icons/aot-icon.svg';
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

// Icons that have their own colors and shouldn't have fill overridden
const customColorIcons: IconNames[] = ['aot'];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Icons = Record<IconNames, React.ComponentType<any>>;

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
    aot: AotIcon,
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

  // Don't override colors for custom SVGs that have their own fill
  const isCustomColorIcon = customColorIcons.includes(name);

  if (isCustomColorIcon) {
    // For custom SVGs, ensure viewBox is preserved for proper scaling
    return (
      <IconComponent
        className={iconClass}
        viewBox='0 0 112 112'
        {...props}
      />
    );
  }

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

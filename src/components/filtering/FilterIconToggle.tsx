'use client';

import React from 'react';

import { cn } from '@/lib/utils';

interface FilterIconToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  icon: React.ReactNode;
  isChecked: boolean;
  onCheckedChange: (isChecked: boolean) => void;
  label: string;
}

/**
 * Kwadratowy przełącznik filtra z samą ikoną, do paska narzędzi w wąskim kontenerze.
 * Zajmuje 36 px zamiast 70 px, które bierze para ikona + Switch, dzięki czemu pasek
 * mieści się w jednym rzędzie także na telefonie.
 *
 * Rola `switch` z `aria-checked` zachowuje tę samą semantykę co komponent Switch,
 * więc czytnik ekranu ogłasza włączony/wyłączony, a nie zwykły przycisk.
 */
const FilterIconToggle = (props: FilterIconToggleProps) => {
  const { icon, isChecked, onCheckedChange, label, className, ...rest } = props;

  return (
    <button
      type='button'
      role='switch'
      aria-checked={isChecked}
      aria-label={label}
      title={label}
      onClick={() => onCheckedChange(!isChecked)}
      className={cn(
        'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border transition-colors',
        'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        isChecked
          ? 'border-primary bg-primary/10 text-primary dark:border-primary/70 dark:bg-primary/20'
          : 'border-input bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground',
        className
      )}
      {...rest}
    >
      {icon}
    </button>
  );
};

export default FilterIconToggle;

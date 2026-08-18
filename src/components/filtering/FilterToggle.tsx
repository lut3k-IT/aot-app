'use client';

import React from 'react';
import type { LucideIcon } from 'lucide-react';

import { Switch } from '@/components/ui/Switch';

import FilterIconToggle from './FilterIconToggle';

interface FilterToggleProps {
  icon: LucideIcon;
  isChecked: boolean;
  onCheckedChange: (isChecked: boolean) => void;
  label: string;
}

/**
 * Przełącznik szybkiego filtra w pasku narzędzi, w dwóch formach.
 *
 * Powyżej 36rem szerokości paska: ikona + Switch, czyli forma znana z desktopu.
 * Poniżej: sama ikona (FilterIconToggle), bo para ikona + Switch bierze 70 px i przy
 * dwóch takich filtrach nie zostawało miejsca na wyszukiwarkę.
 *
 * Obie formy są w drzewie, ale nieaktywna ma `display: none`, więc czytnik ekranu
 * widzi zawsze dokładnie jeden przełącznik.
 */
const FilterToggle = (props: FilterToggleProps) => {
  const { icon, isChecked, onCheckedChange, label } = props;
  const IconComponent = icon;

  return (
    <>
      <div
        className={'flex shrink-0 items-center gap-1.5 @max-xl/bar:hidden'}
        aria-label={label}
      >
        <IconComponent className={'h-5 w-5 text-foreground'} />
        <Switch
          checked={isChecked}
          onCheckedChange={onCheckedChange}
          aria-label={label}
        />
      </div>
      <FilterIconToggle
        className={'@xl/bar:hidden'}
        icon={<IconComponent className={'h-4 w-4'} />}
        isChecked={isChecked}
        onCheckedChange={onCheckedChange}
        label={label}
      />
    </>
  );
};

export default FilterToggle;

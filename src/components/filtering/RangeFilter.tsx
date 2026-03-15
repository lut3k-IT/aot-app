'use client';

import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Input } from '@/components/ui/Input';
import { Slider } from '@/components/ui/Slider';
import { cn } from '@/lib/utils';

interface RangeFilterProps {
  label: string;
  unit?: string;
  min: number;
  max: number;
  currentRange: number[];
  defaultRange: number[];
  onCommit: (range: number[]) => void;
  className?: string;
}

const RangeFilter = ({ label, unit, min, max, currentRange, defaultRange, onCommit, className }: RangeFilterProps) => {
  const { t } = useTranslation();
  const [localRange, setLocalRange] = useState(currentRange);

  React.useEffect(() => {
    setLocalRange(currentRange);
  }, [currentRange]);

  const handleSliderChange = useCallback((value: number[]) => {
    setLocalRange(value);
  }, []);

  const handleSliderCommit = useCallback(
    (value: number[]) => {
      const isDefault = value[0] === defaultRange[0] && value[1] === defaultRange[1];
      onCommit(isDefault ? defaultRange : value);
    },
    [defaultRange, onCommit]
  );

  const handleMinChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMin = Math.max(min, Math.min(+e.target.value, localRange[1]));
      const newRange = [newMin, localRange[1]];
      setLocalRange(newRange);
      onCommit(newRange);
    },
    [min, localRange, onCommit]
  );

  const handleMaxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMax = Math.min(max, Math.max(+e.target.value, localRange[0]));
      const newRange = [localRange[0], newMax];
      setLocalRange(newRange);
      onCommit(newRange);
    },
    [max, localRange, onCommit]
  );

  const displayLabel = unit ? `${label} (${unit})` : label;

  return (
    <div className={cn('space-y-1.5', className)}>
      <div className='flex items-center justify-between gap-2'>
        <span className='text-xs font-medium text-muted-foreground'>{displayLabel}</span>
        <div className='flex items-center gap-1'>
          <Input
            type='number'
            className='h-7 w-12 px-1.5 text-center text-xs'
            min={min}
            max={max}
            value={localRange[0]}
            onChange={handleMinChange}
            aria-label={`${label} (${t('common:range.min')})`}
          />
          <span className='text-xs text-muted-foreground'>—</span>
          <Input
            type='number'
            className='h-7 w-12 px-1.5 text-center text-xs'
            min={min}
            max={max}
            value={localRange[1]}
            onChange={handleMaxChange}
            aria-label={`${label} (${t('common:range.max')})`}
          />
        </div>
      </div>
      <Slider
        value={localRange}
        onValueChange={handleSliderChange}
        onValueCommit={handleSliderCommit}
        min={min}
        max={max}
        step={1}
        minStepsBetweenThumbs={1}
        className='py-1'
      />
    </div>
  );
};

export default RangeFilter;

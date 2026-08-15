'use client';

import { useState } from 'react';
import { LayoutTemplate, X } from 'lucide-react';

import { isLayoutLabEnabled, useLayoutVariant } from '@/components/providers/LayoutVariantProvider';
import {
  LAYOUT_VARIANT_HINTS,
  LAYOUT_VARIANT_LABELS,
  LAYOUT_VARIANTS,
  LayoutVariant
} from '@/constants/layoutVariants';
import { cn } from '@/lib/utils';

/**
 * Pływający wybór wariantu układu. Świadomie nie korzysta z komponentów aplikacji
 * ani z jej palety — ma wyglądać na narzędzie doklejone z zewnątrz, żeby nikt nie
 * pomylił go z elementem interfejsu. Renderuje się tylko na dev.
 *
 * Stan wariantu trzyma LayoutVariantProvider; ten komponent nim tylko steruje.
 */
const DevLayoutSwitcher = () => {
  const { variant, setVariant } = useLayoutVariant();
  const [isOpen, setIsOpen] = useState(false);

  if (!isLayoutLabEnabled) return null;

  if (!isOpen) {
    return (
      <button
        type={'button'}
        onClick={() => setIsOpen(true)}
        aria-label={'Otwórz przełącznik układu'}
        className={
          'fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full bg-neutral-900 py-2 pl-3 pr-4 text-sm font-medium text-neutral-100 shadow-lg ring-1 ring-white/15 transition hover:bg-neutral-800'
        }
      >
        <LayoutTemplate className={'h-4 w-4'} />
        {LAYOUT_VARIANT_LABELS[variant]}
      </button>
    );
  }

  return (
    <div
      className={
        'fixed bottom-4 right-4 z-40 w-72 rounded-xl bg-neutral-900 p-2 text-neutral-100 shadow-2xl ring-1 ring-white/15'
      }
    >
      <div className={'flex items-center justify-between px-2 py-1.5'}>
        <span className={'text-sm font-semibold'}>Wariant układu</span>
        <button
          type={'button'}
          onClick={() => setIsOpen(false)}
          aria-label={'Zamknij przełącznik układu'}
          className={'rounded-md p-1 text-neutral-400 transition hover:bg-white/10 hover:text-neutral-100'}
        >
          <X className={'h-4 w-4'} />
        </button>
      </div>
      <div className={'flex flex-col gap-1'}>
        {LAYOUT_VARIANTS.map((option) => {
          const isActive = option === variant;

          return (
            <button
              key={option}
              type={'button'}
              onClick={() => setVariant(option as LayoutVariant)}
              aria-pressed={isActive}
              className={cn(
                'rounded-lg px-3 py-2 text-left transition',
                isActive ? 'bg-white text-neutral-900' : 'hover:bg-white/10'
              )}
            >
              <div className={'text-sm font-medium leading-tight'}>{LAYOUT_VARIANT_LABELS[option]}</div>
              <div className={cn('text-xs leading-snug', isActive ? 'text-neutral-600' : 'text-neutral-400')}>
                {LAYOUT_VARIANT_HINTS[option]}
              </div>
            </button>
          );
        })}
      </div>
      <p className={'px-3 pb-1 pt-2 text-xs leading-snug text-neutral-500'}>
        Widoczne tylko na dev. Wybór zapisuje się w przeglądarce.
      </p>
    </div>
  );
};

export default DevLayoutSwitcher;

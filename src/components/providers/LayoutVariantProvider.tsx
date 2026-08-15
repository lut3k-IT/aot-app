'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { LocalStorageKey } from '@/constants/enums';
import { DEFAULT_LAYOUT_VARIANT, isLayoutVariant, LayoutVariant } from '@/constants/layoutVariants';

/**
 * Wybór wariantu układu żyje tylko po stronie przeglądarki i tylko na dev.
 * Produkcyjny build nie czyta pamięci przeglądarki i nie renderuje przełącznika,
 * więc użytkownicy zawsze dostają `DEFAULT_LAYOUT_VARIANT`.
 */
export const isLayoutLabEnabled = process.env.NODE_ENV === 'development';

interface LayoutVariantContextValue {
  variant: LayoutVariant;
  setVariant: (variant: LayoutVariant) => void;
}

const LayoutVariantContext = createContext<LayoutVariantContextValue>({
  variant: DEFAULT_LAYOUT_VARIANT,
  setVariant: () => undefined
});

interface LayoutVariantProviderProps {
  children: React.ReactNode;
}

const LayoutVariantProvider = ({ children }: LayoutVariantProviderProps) => {
  const [variant, setVariantState] = useState<LayoutVariant>(DEFAULT_LAYOUT_VARIANT);

  // Odczyt po zamontowaniu, a nie w inicjalizatorze stanu — inaczej pierwszy render
  // klienta rozjechałby się z HTML-em z serwera.
  useEffect(() => {
    if (!isLayoutLabEnabled) return;

    const stored = window.localStorage.getItem(LocalStorageKey.LAYOUT_VARIANT);

    if (isLayoutVariant(stored)) {
      setVariantState(stored);
    }
  }, []);

  const setVariant = useCallback((next: LayoutVariant) => {
    setVariantState(next);
    window.localStorage.setItem(LocalStorageKey.LAYOUT_VARIANT, next);
  }, []);

  const value = useMemo(() => ({ variant, setVariant }), [variant, setVariant]);

  return <LayoutVariantContext.Provider value={value}>{children}</LayoutVariantContext.Provider>;
};

export const useLayoutVariant = () => useContext(LayoutVariantContext);

export default LayoutVariantProvider;

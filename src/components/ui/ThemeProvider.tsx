import React, { createContext, useContext, useEffect, useState } from 'react';

import { LocalStorageKey, Theme } from '@/constants/enums';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: Theme.LIGHT,
  setTheme: () => null
};

import { getLocalStorageItem, setLocalStorageItem } from '@/utils/storageHelpers';

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = Theme.LIGHT,
  storageKey = LocalStorageKey.THEME,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => (getLocalStorageItem(storageKey) as Theme) || defaultTheme);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(Theme.LIGHT, Theme.DARK);

    if (theme === Theme.SYSTEM) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.DARK : Theme.LIGHT;

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      setLocalStorageItem(storageKey, theme);
      setTheme(theme);
    }
  };

  return (
    <ThemeProviderContext.Provider
      {...props}
      value={value}
    >
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};

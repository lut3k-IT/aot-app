'use client';

import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import i18next from 'i18next';

import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { LocalStorageKey, Theme } from '@/constants/enums';
import { store } from '@/store';

import '@/i18n/i18n';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <ThemeProvider
          defaultTheme={Theme.LIGHT}
          storageKey={LocalStorageKey.THEME}
        >
          {children}
        </ThemeProvider>
      </I18nextProvider>
    </Provider>
  );
};

export default Providers;

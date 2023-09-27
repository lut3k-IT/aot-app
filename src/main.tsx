import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';

import './i18n/i18n';

import AppRouter from './app/AppRouter';
import { ThemeProvider } from './components/ui/theme-provider';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <ThemeProvider
        defaultTheme='dark'
        storageKey='vite-ui-theme'
      >
        <AppRouter />
      </ThemeProvider>
    </I18nextProvider>
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import i18next from 'i18next';

import './i18n/i18n';

import AppRouter from './app/AppRouter';
import { ThemeProvider } from './components/ui/ThemeProvider';
import { LocalStorageKey, Theme } from './constants/enums';
import { store } from './store';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <I18nextProvider i18n={i18next}>
          <ThemeProvider
            defaultTheme={Theme.LIGHT}
            storageKey={LocalStorageKey.THEME}
          >
            <AppRouter />
          </ThemeProvider>
        </I18nextProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import i18next from 'i18next';

import './i18n/i18n';

import AppRouter from './app/AppRouter';
import { ThemeProvider } from './components/ui/ThemeProvider';
import { store } from './store';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <HelmetProvider>
          <ThemeProvider
            defaultTheme='dark'
            storageKey='vite-ui-theme'
          >
            <AppRouter />
          </ThemeProvider>
        </HelmetProvider>
      </I18nextProvider>
    </Provider>
  </React.StrictMode>
);

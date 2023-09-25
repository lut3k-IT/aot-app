import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider } from './components/ui/theme-provider';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider
      defaultTheme='dark'
      storageKey='vite-ui-theme'
    ></ThemeProvider>
  </React.StrictMode>
);

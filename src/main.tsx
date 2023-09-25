import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ThemeProvider } from './components/ui/theme-provider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider
      defaultTheme='dark'
      storageKey='vite-ui-theme'
    ></ThemeProvider>
  </React.StrictMode>
);

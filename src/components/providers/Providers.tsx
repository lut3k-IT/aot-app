'use client';

import React, { useEffect, useState } from 'react';
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
  const [isI18nReady, setIsI18nReady] = useState(false);

  useEffect(() => {
    // Monkey patch removeChild and insertBefore to prevent crashes from Google Translate
    if (typeof Node !== 'undefined' && Node.prototype) {
      const originalRemoveChild = Node.prototype.removeChild;
      Node.prototype.removeChild = function <T extends Node>(child: T): T {
        if (child.parentNode !== this) {
          return child;
        }
        return originalRemoveChild.call(this, child) as T;
      };

      const originalInsertBefore = Node.prototype.insertBefore;
      Node.prototype.insertBefore = function <T extends Node>(newNode: T, referenceNode: Node | null): T {
        if (referenceNode && referenceNode.parentNode !== this) {
          return newNode;
        }
        return originalInsertBefore.call(this, newNode, referenceNode) as T;
      };
    }

    // Wait for i18next to be fully initialized with the correct language
    if (i18next.isInitialized) {
      setIsI18nReady(true);
    } else {
      i18next.on('initialized', () => {
        setIsI18nReady(true);
      });
    }
  }, []);

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <ThemeProvider
          defaultTheme={Theme.LIGHT}
          storageKey={LocalStorageKey.THEME}
        >
          {isI18nReady ? children : null}
        </ThemeProvider>
      </I18nextProvider>
    </Provider>
  );
};

export default Providers;

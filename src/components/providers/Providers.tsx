'use client';

import React, { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { MotionConfig } from 'framer-motion';
import i18next from 'i18next';

import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { LocalStorageKey, Theme } from '@/constants/enums';
import { isLazyLanguage, loadLanguageResources } from '@/i18n/loadLanguage';
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

    // Wait for i18next to be fully initialized with the correct language.
    // Jezyk wykryty w przegladarce moze byc jednym z doladowywanych — wtedy trzeba
    // poczekac na jego zasoby, inaczej interfejs mignalby jezykiem awaryjnym.
    const markReady = async () => {
      const detectedLanguage = i18next.resolvedLanguage || i18next.language;

      if (detectedLanguage && isLazyLanguage(detectedLanguage)) {
        try {
          await loadLanguageResources(detectedLanguage);
        } catch {
          // Brak zasobow wykrytego jezyka nie moze zablokowac uruchomienia — zostaje jezyk awaryjny.
        }
      }

      setIsI18nReady(true);
    };

    if (i18next.isInitialized) {
      markReady();
    } else {
      i18next.on('initialized', markReady);
    }
  }, []);

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <MotionConfig reducedMotion={'user'}>
          <ThemeProvider
            defaultTheme={Theme.LIGHT}
            storageKey={LocalStorageKey.THEME}
          >
            {isI18nReady ? children : null}
          </ThemeProvider>
        </MotionConfig>
      </I18nextProvider>
    </Provider>
  );
};

export default Providers;

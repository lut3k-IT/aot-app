declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const source: string;
  export default source;
}

declare module '*.jpg';
declare module '*.png';
declare module '*.jpeg';

declare const APP_VERSION: string;

/// <reference types="vite/client" />
/// <reference types="vite-plugin-sw/client" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module 'virtual:pwa-register/react' {
  // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
  // @ts-expect-error ignore when react is not installed
  import { Dispatch, SetStateAction } from 'react';
  // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
  // @ts-expect-error ignore when react is not installed
  import { RegisterSWOptions } from 'vite-plugin-pwa/types';

  export interface RegisterSWHook {
    needRefresh: [boolean, Dispatch<SetStateAction<boolean>>];
    offlineReady: [boolean, Dispatch<SetStateAction<boolean>>];
    updateServiceWorker: (reloadPage?: boolean) => Promise<void>;
  }

  export function useRegisterSW(options?: RegisterSWOptions): RegisterSWHook;
}

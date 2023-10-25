declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const source: string;
  export default source;
}

declare module '*.jpg';
declare module '*.png';
declare module '*.jpeg';

/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

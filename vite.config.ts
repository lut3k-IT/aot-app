/* eslint-disable @typescript-eslint/naming-convention */
import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: { exportType: 'named', ref: true, svgo: false, titleProp: true },
      include: '**/*.svg'
    })
  ],
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version)
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});

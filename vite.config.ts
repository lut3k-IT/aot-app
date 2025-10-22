/* eslint-disable @typescript-eslint/naming-convention */
import path from 'path';

/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: { exportType: 'named', ref: true, svgo: false, titleProp: true },
      include: '**/*.svg'
    }),
    ViteImageOptimizer({
      jpg: {
        quality: 80
      },
      png: {
        quality: 80
      }
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

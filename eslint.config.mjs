import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import next from 'eslint-config-next';
import prettier from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

/**
 * Flat config (ESLint 9). Zastępuje dawny .eslintrc — `next lint` zniknęło w Next 16,
 * więc lint chodzi teraz przez `eslint .`.
 *
 * Kolejność bloków ma znaczenie: późniejszy nadpisuje wcześniejszy.
 * `prettier` musi zostać na końcu — wyłącza reguły formatujące, które i tak
 * należą do Prettiera (.prettierrc), a w ESLint są oznaczone jako przestarzałe.
 */
const config = [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'next-env.d.ts',
      // generowane przez @ducanh2912/next-pwa przy każdym buildzie
      'public/sw.js',
      'public/workbox-*.js'
    ]
  },

  js.configs.recommended,

  // react, react-hooks, jsx-a11y, import oraz @next/next + parser TS dla .ts/.tsx
  ...next,

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: {
      // odpowiednik dawnego "plugin:@typescript-eslint/recommended"
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'off',

      /**
       * Konwencje nazewnicze projektu (opisane też w CLAUDE.md).
       * Reguła dla booleanów wymaga informacji o typach — stąd `projectService` wyżej.
       */
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'import', format: ['camelCase', 'PascalCase'] },
        { selector: 'default', format: ['camelCase'] },
        { selector: 'variable', format: ['camelCase', 'PascalCase'] },
        { selector: 'function', format: ['camelCase', 'PascalCase'] },
        { selector: 'variable', modifiers: ['const'], format: ['camelCase', 'PascalCase', 'UPPER_CASE'] },
        {
          selector: 'variable',
          types: ['boolean'],
          format: ['PascalCase'],
          prefix: ['is', 'should', 'has', 'can', 'did', 'will', 'match']
        },
        { selector: 'objectLiteralProperty', format: null },
        { selector: 'parameter', format: ['camelCase'], leadingUnderscore: 'allow' },
        { selector: 'memberLike', modifiers: ['private'], format: ['camelCase'], leadingUnderscore: 'require' },
        { selector: 'typeLike', format: ['PascalCase'] },
        { selector: 'enumMember', format: ['UPPER_CASE'] },
        { selector: 'default', modifiers: ['static'], format: ['UPPER_CASE'] }
      ]
    }
  },

  {
    plugins: { 'simple-import-sort': simpleImportSort },
    rules: {
      'no-unused-vars': 'off',
      'no-empty-pattern': 'warn',
      'no-useless-escape': 'off',
      'no-prototype-builtins': 'warn',
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/exhaustive-deps': 'off',

      /**
       * Reguła doszła w eslint-plugin-react-hooks 7 (zestaw React Compiler) i zapala się
       * w 21 istniejących miejscach — działających, ale zapisanych „po staremu”.
       * Wyłączona świadomie, żeby aktualizacja zależności nie ciągnęła za sobą
       * przepisywania hooków. Do rozważenia jako osobne zadanie.
       */
      'react-hooks/set-state-in-effect': 'off',

      'jsx-a11y/anchor-is-valid': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      // next/image jest w projekcie importowany jako NextImage — `Image` to ikona z lucide-react
      'jsx-a11y/alt-text': ['warn', { elements: ['img'], img: ['NextImage'] }],

      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            [
              '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)'
            ],
            ['^react', '^@?\\w'],
            ['^(@|@company|@ui|components|utils|hooks|assets|config|api|types|vendored-lib|context)(/.*|$)'],
            ['^\\u0000'],
            ['^components'],
            ['^\\u0000'],
            ['^src(\\/.*|$)', '^features(\\/.*|$)', '^assets(\\/.*|$)', '^components(\\/.*|$)'],
            ['^\\u0000'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$', '^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ['^.+\\.s?css$'],
            ['^.+\\.(jpg|jpeg|png|svg)$']
          ]
        }
      ]
    }
  },

  // skrypty pomocnicze i pliki konfiguracyjne chodzą w Node, nie w przeglądarce
  {
    files: ['scripts/**/*.{js,mjs}', '*.config.{js,mjs}'],
    languageOptions: {
      globals: { ...globals.node }
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off'
    }
  },

  prettier
];

export default config;

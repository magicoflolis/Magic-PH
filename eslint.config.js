import js from '@eslint/js';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';

const repoGlobals = {
  mph: 'writable',
  config: 'writable',
  webext: 'readonly',
  brws: 'readonly',
  downloadCSS: 'readonly',
  Limit_Downloads: 'readonly',
  ...globals.es2021
};
const parserOptions = {
  allowImportExportEverywhere: false,
  ecmaFeatures: {
    globalReturn: true,
    arrowFunctions: true,
    modules: true
  }
};
const rules = {
  'keyword-spacing': ['error', { before: true }],
  'no-var': 'error',
  'prefer-const': ['error', { destructuring: 'all' }],
  'prefer-promise-reject-errors': 'error',
  'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
  quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
  'space-before-blocks': ['error', 'always']
};

export default [
  js.configs.recommended,
  eslintConfigPrettier,
  {
    files: ['src/js/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        exportFunction: 'readonly',
        ...repoGlobals,
        ...globals.browser,
        ...globals.webextensions
      },
      parserOptions
    },
    rules
  },
  {
    files: ['src/UserJS/main.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        languageList: 'readonly',
        ...repoGlobals,
        ...globals.browser,
        ...globals.greasemonkey
      },
      parserOptions
    },
    rules
  },
  {
    files: ['tools/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...repoGlobals,
        ...globals.node
      },
      parserOptions
    },
    rules
  }
];

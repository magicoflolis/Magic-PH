import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';

const userJSGlobals = {
  userjs: 'writable',
  config: 'writable',
  mainCSS: 'readonly',
  Limit_Downloads: 'readonly',
  code: 'readonly',
  metadata: 'readonly',
  languageList: 'readonly',
  translations: 'readonly',
  ...globals.es2024,
  ...globals.browser,
  ...globals.greasemonkey
};
const webextGlobals = {
  mph: 'writable',
  config: 'writable',
  webext: 'readonly',
  brws: 'readonly',
  downloadCSS: 'readonly',
  Limit_Downloads: 'readonly',
  ...globals.es2024,
  ...globals.browser,
  ...globals.webextensions
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
  pluginJs.configs.recommended,
  eslintConfigPrettier,
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: webextGlobals,
      parserOptions
    },
    rules
  },
  {
    files: ['src/UserJS/main.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: userJSGlobals,
      parserOptions
    },
    rules
  },
  {
    files: ['src/UserJS/header.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: userJSGlobals,
      parserOptions
    },
    rules: {
      ...rules,
      quotes: 'off',
      'no-unused-vars': 'off'
    }
  },
  {
    files: ['tools/*.js', 'utils/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.es2024,
        ...globals.node
      },
      parserOptions
    },
    rules
  }
];

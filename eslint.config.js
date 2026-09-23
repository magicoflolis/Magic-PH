// @ts-check
import globals from 'globals';
import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import tseslint from 'typescript-eslint';

export default defineConfig([
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    files: ['src/js/*.js'],
    rules: {
      'no-var': 'error',
      'prefer-const': ['error', { destructuring: 'all' }],
      'prefer-promise-reject-errors': 'error',
      'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
      quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
      'space-before-blocks': ['error', 'always']
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.es2024,
        ...globals.browser,
        ...globals.webextensions
      }
    }
  },
  {
    files: ['src/UserJS/main.js'],
    rules: {
      'no-var': 'error',
      'prefer-const': ['error', { destructuring: 'all' }],
      'prefer-promise-reject-errors': 'error',
      'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
      quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
      'space-before-blocks': ['error', 'always']
    },
    languageOptions: {
      sourceType: 'script',
      globals: {
        main_css: 'readonly',
        page_css: 'readonly',
        translations: 'readonly',
        ...globals.es2024,
        ...globals.browser,
        ...globals.greasemonkey
      }
    }
  },
  {
    files: ['src/UserJS/header.js'],
    rules: {
      quotes: 'off',
      'no-unused-vars': 'off',
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-unused-expressions': 'off'
    },
    languageOptions: {
      sourceType: 'script',
      globals: {
        code: 'readonly',
        metadata: 'readonly',
        languageList: 'readonly',
        ...globals.es2024,
        ...globals.browser,
        ...globals.greasemonkey
      }
    }
  },
  {
    files: ['tools/*.{js,mjs,cjs}', 'utils/**/*.js'],
    rules: {
      'no-var': 'error',
      'prefer-const': [
        'error',
        {
          destructuring: 'any',
          ignoreReadBeforeAssign: false
        }
      ],
      'prefer-promise-reject-errors': 'error',
      'prefer-regex-literals': [
        'error',
        {
          disallowRedundantWrapping: true
        }
      ],
      quotes: [
        'error',
        'single',
        {
          avoidEscape: true,
          allowTemplateLiterals: false
        }
      ],
      'space-before-blocks': ['error', 'always']
    },
    languageOptions: {
      globals: {
        ...globals.es2024,
        ...globals.node
      }
    }
  }
]);

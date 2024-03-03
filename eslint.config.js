'use strict'
import js from '@eslint/js'
import globals from 'globals'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  js.configs.recommended,
  eslintConfigPrettier,
  {
    // files: ['**/*.js'],
    ignores: [
      '/test-server/*.js',
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        mph: 'writable',
        config: 'writable',
		    debug: 'readonly',
		    debugToggle: 'readonly',
        webext: 'readonly',
        brws: 'readonly',
        downloadCSS: 'readonly',
        Limit_Downloads: 'readonly',
        ...globals.node,
        ...globals.nodeBuiltin,
        ...globals.browser,
        ...globals.greasemonkey,
        ...globals.webextensions,
      },
      parserOptions: {
        allowImportExportEverywhere: false,
        ecmaFeatures: {
          globalReturn: true,
          arrowFunctions: true,
          modules: true
        }
      },
    },
    rules: {
      'keyword-spacing': ['error', { before: true }],
      'no-var': 'error',
      'prefer-const': ['error', { destructuring: 'all' }],
      'prefer-promise-reject-errors': 'error',
      'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
      quotes: [
        'error',
        'single',
        { avoidEscape: true, allowTemplateLiterals: false },
      ],
      'space-before-blocks': ['error', 'always'],
    },
  },
]

import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import pluginTypescript from '@typescript-eslint/eslint-plugin'
import parserTypescript from '@typescript-eslint/parser'
import pluginPrettier from 'eslint-plugin-prettier'
import configPrettier from 'eslint-config-prettier'

export default [
  // ESLint's recommended rules
  pluginJs.configs.recommended,

  // TypeScript rules
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: parserTypescript,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        sourceType: 'module',
        project: './tsconfig.json' // Adjust if your tsconfig.json is elsewhere
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      '@typescript-eslint': pluginTypescript
    },
    rules: {
      ...pluginTypescript.configs.recommended.rules,
      ...pluginTypescript.configs['recommended-requiring-type-checking'].rules,
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-misused-promises': 'off'
    }
  },

  // React rules
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react: pluginReact
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      'react/jsx-uses-react': 'off', // For React 17+
      'react/react-in-jsx-scope': 'off', // For React 17+
      'react/prop-types': 'off'
    },
    settings: {
      react: {
        pragma: 'h',
        // We use "react 16.0" to avoid pushing folks to UNSAFE_ methods.
        version: '16.0'
      }
    }
  },

  // Prettier integration
  configPrettier, // Disables ESLint rules that conflict with Prettier
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      prettier: pluginPrettier
    },
    rules: {
      'prettier/prettier': 'error' // Enforces Prettier formatting as an ESLint rule
    }
  },

  // Ignore files
  {
    ignores: ['node_modules/', 'dist/', 'eslint.config.js', 'webpack.*.js']
  }
]

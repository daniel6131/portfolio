import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  {
    ignores: ['dist', 'node_modules', '.git', 'coverage'],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      // ESLint base rules
      ...js.configs.recommended.rules,

      // React rules
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off',
      // Allow Three.js/React Three Fiber properties
      'react/no-unknown-property': [
        'error',
        {
          ignore: [
            // Three.js Object3D properties
            'position',
            'rotation',
            'scale',
            'visible',
            'castShadow',
            'receiveShadow',
            'frustumCulled',
            'renderOrder',
            'userData',
            'dispose',
            'attach',
            'args',
            'object',
            // Three.js Material properties
            'transparent',
            'opacity',
            'alphaTest',
            'side',
            'color',
            'emissive',
            'map',
            'normalMap',
            'roughnessMap',
            'metalnessMap',
            'envMap',
            // Three.js Geometry properties
            'geometry',
            'material',
            'skeleton',
            // Three.js Light properties
            'intensity',
            'distance',
            'angle',
            'penumbra',
            'decay',
            // Three.js Camera properties
            'fov',
            'aspect',
            'near',
            'far',
            'zoom',
            // React Three Fiber specific
            'primitive',
            'key',
          ],
        },
      ],
      // Relax unescaped entities rule for apostrophes
      'react/no-unescaped-entities': [
        'error',
        {
          forbid: [
            {
              char: '>',
              alternatives: ['&gt;'],
            },
            {
              char: '}',
              alternatives: ['&#125;'],
            },
          ],
        },
      ],

      // React Refresh
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // Accessibility
      ...jsxA11y.configs.recommended.rules,
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',

      // General code quality
      'no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
      semi: ['error', 'always'],
      quotes: ['error', 'single', { avoidEscape: true }],

      // Import/Export
      'no-duplicate-imports': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  // Disable conflicting rules with Prettier
  prettier,
];

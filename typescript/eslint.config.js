import globals from 'globals';
import eslintJs from '@eslint/js';
import tsEslint from 'typescript-eslint';

export default [
  {
    ignores: ['build/*'],
  },
  {
    files: ['eslint.config.js', 'scripts/*.js'],
    ...eslintJs.configs.recommended,
  },
  ...tsEslint.config({
    files: ['src/*.ts'],
    extends: [eslintJs.configs.recommended, ...tsEslint.configs.strictTypeChecked],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowAny: false,
          allowBoolean: false,
          allowNullish: false,
          allowNumber: true,
          allowRegExp: false,
          allowNever: false,
        },
      ],
    },
  }),
  {
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.node,
      parserOptions: {
        project: true,
        tsconfigDirName: import.meta.dirname,
      },
    },
  },
];

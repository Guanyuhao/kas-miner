const { join } = require('path');

module.exports = {
  root: true,
  extends: '@arcblock/eslint-config-ts',
  parserOptions: {
    project: [join(__dirname, 'tsconfig.eslint.json'), join(__dirname, 'tsconfig.json')],
  },
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'react/function-component-definition': 'off',
    'no-console': ['error', { allow: ['warn', 'error', 'info', 'log'] }],
    'react/require-default-props': 'off',
  },
};

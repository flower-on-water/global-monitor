module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: [
    'sonarjs',
  ],
  extends: [
    'plugin:vue/recommended',
    'plugin:sonarjs/recommended',
    '@vue/airbnb',
    '@vue/typescript',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/max-attributes-per-line': ['error', {
      'singleline': 5,
      'multiline': {
        'max': 5,
        'allowFirstLine': false
      }
    }],
    'lines-between-class-members': 'off',
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  settings: {
    'import/resolver': {
      "typescript": {},
    },
    // https://www.npmjs.com/package/eslint-plugin-import#importcore-modules
    'import/core-modules': [
      'electron'
    ]
  }
};

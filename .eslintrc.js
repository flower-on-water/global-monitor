module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
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
    }]
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  settings: {
    // https://www.npmjs.com/package/eslint-plugin-import#importcore-modules
    'import/core-modules': [
      'electron'
    ]
  }
};

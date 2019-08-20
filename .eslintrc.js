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
      'singleline': 7,
      'multiline': {
        'max': 7,
        'allowFirstLine': false
      }
    }],
    'lines-between-class-members': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'no-unused-expressions': ['error', {
      'allowTernary': true,
      'allowShortCircuit': true,
    }],
    'no-param-reassign': ['error', {
      'props': false,
    }],
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  settings: {
    'import/resolver': {
      'typescript': {},
    },
    // https://www.npmjs.com/package/eslint-plugin-import#importcore-modules
    'import/core-modules': [
      'electron'
    ]
  }
};

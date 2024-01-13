module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb-base',
    'eslint:all',
    'plugin:react/recommended'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    'comma-dangle': ['error', 'never'],
    'no-param-reassign': [
      'error',
      {
        props: false
      }
    ],
    radix: 0,
    'id-length': 0,
    'no-underscore-dangle': 0,
    'no-warning-comments': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'react/jsx-one-expression-per-line': 0,
    'require-unicode-regexp': 0,
    'prefer-named-capture-group': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'react/no-unescaped-entities': 0,
    'react/function-component-definition': 0,
    'react/display-name': 0,
    'react/jsx-no-useless-fragment': 0,
    'import/no-cycle': 0,
    'class-methods-use-this': 0,
    'no-invalid-this': 0,
    'react/prop-types': 0,
    'react/jsx-indent': ['error', 2],
    'spaced-comment': 0,
    'max-lines': 0,
    'import/no-named-as-default': 0,
    'import/no-extraneous-dependencies': 0,
    'no-shadow': 0,
    'default-param-last': 0,
    'import/prefer-default-export': 0,
    'array-element-newline': 0,
    'multiline-ternary': 0,
    'no-magic-numbers': 0,
    'arrow-body-style': 0,
    'no-alert': 0,
    'eslint(quotes)': 0,
    'max-lines-per-function': 0,
    'object-curly-newline': 0,
    'no-unused-expressions': 0,
    'no-confusing-arrow': 0,
    'implicit-arrow-linebreak': 0,
    'function-paren-newline': 0,
    'no-useless-constructor': 0,
    'object-shorthand': 0,
    'no-ternary': 0,
    'sort-keys': 0,
    'max-len': 0,
    'no-console': 0,
    'no-return-assign': 0,
    'linebreak-style': 0,
    'react/jsx-filename-extension': 0,
    'no-nested-ternary': 0,
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: true,
        memberSyntaxSortOrder: ['none',
          'all',
          'multiple',
          'single']
      }
    ]
  }
};

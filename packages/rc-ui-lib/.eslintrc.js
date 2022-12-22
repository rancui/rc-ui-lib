module.exports = {
  extends: [require.resolve('@rancui/linter/dist/eslint')],
  rules: {
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/naming-convention': 0,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0,
    'no-console': 0,
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    'no-plusplus': 0,
    'no-use-before-define': 0,
    'react/default-props-match-prop-types': 0,
  },
};

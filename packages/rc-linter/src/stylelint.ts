module.exports = {
  extends: [
    'stylelint-config-standard-less',
    'stylelint-config-css-modules',
    'stylelint-config-rational-order',
  ],
  customSyntax: 'postcss-less',
  plugins: ['stylelint-order', 'stylelint-declaration-block-no-ignored-properties'],
  rules: {
    'no-descending-specificity': null,
    'function-url-quotes': 'always',
    'font-family-no-missing-generic-family-keyword': null, // iconfont
    'plugin/declaration-block-no-ignored-properties': true,
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
    'selector-class-pattern': null,
    'import-notation': 'string',
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: ['lighten', 'percentage', 'constant', 'darken'],
      },
    ],
    'at-rule-empty-line-before': null,
    'keyframes-name-pattern': null,
    'rule-empty-line-before': null
  },
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
};

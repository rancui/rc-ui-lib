const commitRules = {
  'no-alert': 2,
  'no-debugger': 2,
  'no-console': [
    'error',
    {
      allow: ['warn', 'error'],
    },
  ],
  'no-unused-vars': 2,
};

module.exports = {
  root: true,
  extends: [
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  globals: {
    React: true,
    ReactDOM: true,
  },
  rules: {
    'no-shadow': 0,
    'no-new': 0,
    'consistent-return': 0,
    'no-param-reassign': 0,
    'no-void': 0,
    'no-plusplus': 0,
    '@typescript-eslint/no-shadow': 0,
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': ['error'],
    'no-self-compare': 0,
    'brace-style': [2, '1tbs', { allowSingleLine: true }],
    'block-spacing': [2, 'always'],
    'no-const-assign': 2,
    'prefer-destructuring': 0, // 推荐通过结构赋值访问 object 或者 array
    'no-prototype-builtins': 0,
    'no-useless-escape': 0,
    'no-unused-expressions': 2, // 开启对短路求值和三元表达式的支持
    'no-console': [2, { allow: ['warn', 'error', 'log'] }],
    'no-nested-ternary': 2, // 禁止三元表达式嵌套
    // jsx
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': [0, { custom: 'ignore' }],
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/click-events-have-key-events': 0, // 强制 绑定 onClick 事件同时也绑定 onKeyUp, onKeyDown, onKeyPress 等事件
    'jsx-a11y/no-static-element-interactions': 0, // 强制给 div span 等没有语义的标签加上 role 角色，（在有onClick 等事件的前提下）
    'jsx-a11y/interactive-supports-focus': 0,
    // react
    'react/state-in-constructor': 0,
    'react/jsx-no-undef': [
      2,
      {
        allowGlobals: true,
      },
    ],
    'react/static-property-placement': 0, // static 静态类型强制定义在class 组件外
    'react/no-deprecated': 0,
    'react/jsx-no-target-blank': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }], // 识别扩展名
    // ts
    "@typescript-eslint/no-explicit-any":0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'prettier/prettier': [
      'error',
      {},
      {
        fileInfoOptions: {
          withNodeModules: false,
        },
      },
    ],
    ...(process.env.ESLINT_ENV === 'commit' ? commitRules : {}),
  },
  env: {
    browser: true,
    node: true,
  },
};

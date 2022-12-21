const babel = require('@babel/core');
const esbuild = require('esbuild');

// const { BABEL_MODULE, NODE_ENV } = process.env;
// const isTest = NODE_ENV === 'test';
// const useESModules = BABEL_MODULE !== 'commonjs' && !isTest;

const isJsxFile = (path) => /\.(j|t)sx$/.test(path);
const isTsxFile = (path) => /\.tsx$/.test(path);

const transformJsx = (code, path) => {
  const babelResult = babel.transformSync(code, {
    filename: path,
    babelrc: false,
    presets: isTsxFile(path)
      ? ['@babel/preset-typescript', '@babel/preset-react']
      : ['@babel/preset-react'],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: false,
          useESModules: true,
        },
      ],
    ],
  });
  return babelResult?.code || '';
};

const transformScript = (code) =>
  esbuild.transformSync(code, {
    target: 'es2016',
    format: 'cjs',
    loader: 'ts',
  }).code;

module.exports = {
  canInstrument: true,
  process(code, path) {
    if (isJsxFile(path)) {
      code = transformJsx(code, path);
    }
    return {
      code: transformScript(code),
    };
  },
};

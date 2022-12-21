const babel = require('@babel/core');
const esbuild = require('esbuild');

const isJsxFile = (path) => /\.(j|t)sx$/.test(path);
const isTsxFile = (path) => /\.tsx$/.test(path);

const transformJsx = (code, path) => {
  const babelResult = babel.transformSync(code, {
    filename: path,
    babelrc: false,
    presets: isTsxFile(path)
      ? ['@babel/preset-typescript', '@babel/preset-react']
      : ['@babel/preset-react'],
    plugins: [],
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

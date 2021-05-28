import * as path from 'path';
import * as fs from 'fs';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import image from '@rollup/plugin-image';
import eslint from '@rollup/plugin-eslint';
import styles from 'rollup-plugin-styles';
import { terser } from 'rollup-plugin-terser';
import autoprefixer from 'autoprefixer';
import { join } from 'path';
import { ensureFile, outputFileSync } from 'fs-extra';

const entryFile = 'src/index.ts';
const BABEL_ENV = process.env.BABEL_ENV || 'umd';
const extensions = ['.js', '.ts', '.tsx'];
const globals = { react: 'React', 'react-dom': 'ReactDOM' };
const externalPkg = ['react', 'react-dom', 'classnames'];
BABEL_ENV !== 'umd' && externalPkg.push('@babel/runtime');
const external = (id) => externalPkg.some((e) => id.indexOf(e) === 0);
const srcDir = 'src';
const EXCLUDES = ['.DS_Store', 'utils', 'index.ts'];
const cModuleNames = fs.readdirSync(path.resolve(srcDir));
const modules = cModuleNames.filter((dir) => !EXCLUDES.includes(dir));
const componentEntryFiles = modules
  .map((name) => {
    if (/^[a-z]\w+/.test(name)) {
      return `${srcDir}/${name}/index.tsx`;
    }
  })
  .filter((n) => !!n);

const commonPlugins = [
  image(),
  eslint({ fix: true, exclude: ['*.scss', '*.png', '*.svg'] }),
  resolve({ extensions }),
  babel({
    exclude: 'node_modules/**', // 只编译源代码
    babelHelpers: 'runtime',
    extensions,
    skipPreflightCheck: true,
  }),
  // 全局变量替换
  replace({
    preventAssignment: true,
    exclude: 'node_modules/**',
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.BABEL_ENV': JSON.stringify(BABEL_ENV || 'umd'),
  }),
  commonjs(),
];
const stylePluginConfig = {
  mode: 'extract',
  extensions: ['.scss', '.css'],
  minimize: true,
  use: ['sass'],
  url: {
    inline: true,
  },
  plugins: [autoprefixer({ env: BABEL_ENV })],
};
const umdOutput = {
  format: 'umd',
  name: 'rc-ui',
  globals,
  assetFileNames: '[name].[ext]',
};
const esOutput = {
  globals,
  preserveModules: true,
  preserveModulesRoot: 'src',
  exports: 'named',
  assetFileNames: ({ name }) => {
    const { ext, dir, base } = path.parse(name);
    let jsfilePath = '';
    if (BABEL_ENV === 'esm') {
      jsfilePath = join(process.cwd(), `es/${dir}/style/index.js`);
    } else if (BABEL_ENV === 'cjs') {
      jsfilePath = join(process.cwd(), `cjs/${dir}/style/index.js`);
    }
    ensureFile(jsfilePath, (err) => {
      if (err) {
        console.log('error', err);
      }
      outputFileSync(jsfilePath, `import './${base}'`);
    });
    if (ext !== '.css') return '[name].[ext]';
    // 规范 style 的输出格式
    return path.join(dir, 'style', base);
  },
};
const esStylePluginConfig = {
  ...stylePluginConfig,
  sourceMap: false,
  onExtract(data) {
    // 一下操作用来确保只输出一个 index.css
    const { css, name, map } = data;
    const { base } = path.parse(name);
    if (base !== 'index.css') return false;
    return true;
  },
};

export default () => {
  switch (BABEL_ENV) {
    case 'umd':
      return [
        {
          input: entryFile,
          output: { ...umdOutput, file: 'umd/rc-ui.development.js' },
          external,
          plugins: [styles(stylePluginConfig), ...commonPlugins],
        },
        {
          input: entryFile,
          output: { ...umdOutput, file: 'umd/rc-ui.production.min.js', plugins: [terser()] },
          external,
          plugins: [styles({ ...stylePluginConfig, minimize: true }), ...commonPlugins],
        },
      ];
    case 'esm':
      return {
        input: [entryFile, ...componentEntryFiles],
        preserveModules: true, // rollup-plugin-styles 还是需要使用
        output: { ...esOutput, dir: 'es', format: 'es' },
        external,
        plugins: [styles(esStylePluginConfig), ...commonPlugins, terser()],
      };
    case 'cjs':
      return {
        input: [entryFile, ...componentEntryFiles],
        preserveModules: true, // rollup-plugin-styles 还是需要使用
        output: { ...esOutput, dir: 'cjs', format: 'cjs' },
        external,
        plugins: [styles(esStylePluginConfig), ...commonPlugins, terser()],
      };
    default:
      return [];
  }
};

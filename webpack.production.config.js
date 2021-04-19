const path = require('path');
const os = require('os');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const HappyPack = require('happypack');
// eslint-disable-next-line new-cap
const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
});
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
function resolveResource(name) {
  return path.resolve(__dirname, 'src/assets/scss/' + name);
}
module.exports = {
  mode: 'production',
  entry: './src/components/index.js',
  output: {
    path: path.join(__dirname, './lib'),
    filename: '[name].js',
    library: 'vant-react',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js', '.ts','.json', '.jsx','.tsx'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  externals: {
    'react': {
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    }
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/, // jsx/js文件的正则
      include: path.resolve(__dirname, 'src'),
      enforce: 'pre',
      use: [{
        loader: 'babel-loader',
        options: {
          // babel 转义的配置选项
          babelrc: false,
          presets: [
            // 添加 preset-react
            '@babel/preset-react',
            '@babel/preset-env',
          ],
          cacheDirectory: true,
        },
      },
      {
        loader: require.resolve('eslint-loader'),
        options: {
          eslintPath: require.resolve('eslint')
        },
      },
      ],
    },
    {
      test: /.(js)$/,
      use: ['happypack/loader?id=babel'],
      exclude: /node_modules/,
    },
    {
      test: /\.(ts|tsx)$/,
      exclude: /node-modules/,
      use: [
        'babel-loader', 'ts-loader'
      ]
    },
    {
      test: /\.css$/,
      include: /node_modules/,
      use: ['style-loader', 'css-loader', 'postcss-loader']
    },
    {
      test: /\.(s[ac]ss)$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[name]__[local]$[hash:base64:5]'
            }
          }
        },
        'postcss-loader',
        'sass-loader',
        {
          loader: 'sass-resources-loader',
          options: {
            resources: [resolveResource('mixin.scss'), resolveResource('var.scss')]
          }
        }
      ]
    },
    {
      test: /\.(png|webp|jpe?g|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          esModule: false,
          name: '[path][name].[ext]',
          limit: 10240
        }
      }]
    },
    {
      test: /\.(ttf|eot|woff|woff2|svg)$/,
      use: 'url-loader'
    }
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
      inject: true,
    }),
    new HappyPack({
      id: 'babel',
      loaders: ['babel-loader?cacheDirectory'],
      threadPool: happyThreadPool,
      verbose: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()], // 代码压缩
    splitChunks: {
      chunks: 'all',
    }
  },
  performance: {
    hints: false
  }
};
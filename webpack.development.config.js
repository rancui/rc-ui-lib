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
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, './lib'),
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.js', '.ts', '.json', '.jsx', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  devServer: {
    contentBase: path.join(__dirname, './lib'),
    host: '0.0.0.0',
    port: 3000,
    hot: true,
    stats: {
      colors: true,
    },
  },
  devtool: 'source-map',
  module: {
    rules: [
    {
      test: /\.(js|jsx)$/, // jsx/js文件的正则
      include: path.resolve(__dirname, 'src'),
      use: 'babel-loader'
    },
    // {
    //   test: /.(js)$/,
    //   use: ['happypack/loader?id=babel'],
    //   exclude: /node_modules/,
    // },
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
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()], // 代码压缩
    splitChunks: {
      chunks: 'all',
    }
  },
  // performance: {
  //   hints: 'warning', // 枚举
  //   maxAssetSize: 300000, // 整数类型（以字节为单位）
  //   maxEntrypointSize: 500000, // 整数类型（以字节为单位）
  //   assetFilter: function(assetFilename) {
  //     // 提供资源文件名的断言函数
  //     return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
  //   }
  // },
};
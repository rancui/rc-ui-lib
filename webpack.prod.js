const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const fileEntries = require('./config/entries');

function resolveResource(name) {
    return path.resolve(__dirname, 'src/assets/scss/' + name);
}
module.exports = {
    entry: fileEntries,
    output: {
        path: path.join(__dirname, 'lib'),
        filename: (chunkData) => {
            return chunkData.chunk.name === 'index' ? '[name].js' : 'components/[name]/index.js';
        },
        library: 'vant-react',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        // https://github.com/webpack/webpack/issues/6522
        globalObject: "typeof self !== 'undefined' ? self : this"
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.json'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    externals: {
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
        }
    },
    externals: {},
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // jsx/js文件的正则
                include: path.resolve(__dirname, 'src'),
                enforce: 'pre',
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            // babel 转义的配置选项
                            babelrc: false,
                            presets: [
                                // 添加 preset-react
                                '@babel/preset-react',
                                '@babel/preset-env'
                            ],
                            cacheDirectory: true
                        }
                    },
                    {
                        loader: require.resolve('eslint-loader'),
                        options: {
                            eslintPath: require.resolve('eslint')
                        }
                    }
                ]
            },
            {
                test: /.(js)$/,
                use: ['happypack/loader?id=babel'],
                exclude: /node_modules/
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node-modules/,
                use: ['babel-loader', 'ts-loader']
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
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            esModule: false,
                            name: '[path][name].[ext]',
                            limit: 10240
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|woff|woff2|svg)$/,
                use: 'url-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: 'public/index.html',
            filename: 'index.html',
            inject: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                //禁止生成index.js.LICENSE.txt
                extractComments: false,
                parallel: true,
                terserOptions: {
                    output: {
                        comments: false
                    },
                    compress: {
                        warnings: false,
                        drop_console: true,
                        drop_debugger: true,
                        pure_funcs: ['console.log'] //移除console
                    }
                }
            })
        ]
    }
};

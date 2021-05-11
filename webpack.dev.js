const path = require('path');
const os = require('os');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length
});

function resolveResource(name) {
    return path.resolve(__dirname, `src/components/style/${name}`);
}
module.exports = {
    mode: 'development',
    entry: './src/examples/index.js',
    output: {
        path: path.join(__dirname, './lib'),
        filename: 'index.js'
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
            colors: true
        }
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // jsx/js文件的正则
                include: path.resolve(__dirname, 'src'),
                use: 'babel-loader'
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
                        loader: 'css-loader'
                        // options: {
                        //     modules: {
                        //         localIdentName: '[name]__[local]$[hash:base64:5]'
                        //     }
                        // }
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
    ]
    // optimization: {
    //     minimize: true,
    //     minimizer: [
    //         new TerserPlugin({
    //             //禁止生成index.js.LICENSE.txt
    //             extractComments: false,
    //             parallel: true,
    //             terserOptions: {
    //                 output: {
    //                     comments: false
    //                 },
    //                 compress: {
    //                     warnings: false,
    //                     drop_console: true,
    //                     drop_debugger: true,
    //                     pure_funcs: ['console.log //移除console
    //                 }
    //             }
    //         })
    //     ]
    // }
};

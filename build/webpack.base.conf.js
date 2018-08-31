const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const vueLoaderConf = require('./vue-loader.conf');
const { styleLoader } = require('./utils');
const config = require('../config');

function resolve(...args) {
    return path.join(__dirname, '../', ...args);
}

const files = glob.sync(`${config.srcPath}/**/*.entry.js`);
const entryjs = {};
const plugins = [];

files.forEach(filePath => {
    var filename = path.basename(filePath).replace(/\.entry.js$/, '');
    var dirPath = path.relative(config.srcPath, path.dirname(filePath));
    entryjs[filename] = filePath;
    plugins.push(
        new HtmlWebpackPlugin({
            filename: path.join(dirPath, filename) + '.html',
            template: resolve('index.html'),
            hash: true,
            chunks: ['vendors', filename],
            chunksSortMode: 'dependency'
        })
    );
});

module.exports = {
    context: config.srcPath,
    devtool: 'source-map',
    entry: entryjs,
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': config.srcPath
        }
    },
    output: {
        path: config.distPath,
        filename: 'js/[name].js',
        publicPath: config.publicUrl
    },
    plugins: [
        new VueLoaderPlugin(),
        new ExtractTextPlugin({
            filename: 'css/[name].css',
            allChunks: true
        }),
        ...plugins,
        new CopyWebpackPlugin([
            {
                from: config.staticPath,
                to: config.subPublicUrl,
                ignore: ['.*'],
                cache: true
            }
        ])
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                include: config.srcPath,
                loader: 'vue-loader',
                options: vueLoaderConf
            },
            {
                test: /\.js$/,
                include: config.srcPath,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            },
            ...styleLoader()
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    node: {
        setImmediate: false,
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
};

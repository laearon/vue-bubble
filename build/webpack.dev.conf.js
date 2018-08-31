const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConf = require('./webpack.base.conf');
const config = require('../config');

module.exports = merge(webpackBaseConf, {
    mode: 'development',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: false,
        port: process.env.PORT || 3000,
        publicPath: config.publicUrl,
        hot: true,
        host: '0.0.0.0',
        disableHostCheck: true,
        historyApiFallback: false
    }
});

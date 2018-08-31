const path = require('path');

function resolve(...args) {
    return path.join(__dirname, '../', ...args);
}

module.exports = {
    context: resolve('src'),
    devtool: 'source-map',
    entry: resolve('src/index.js'),
    output: {
        path: resolve('bundle'),
        filename: 'vue-bubble.js',
        publicPath: '.',
        library: 'VueBubble',
        libraryTarget: 'umd'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                include: resolve('src'),
                loader: 'babel-loader'
            }
        ]
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

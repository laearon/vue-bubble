const ExtractTextPlugin = require('extract-text-webpack-plugin');
exports.cssLoaders = function() {
    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: true
        }
    };
    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: true
        }
    };
    function generateLoaders(loader) {
        const loaders = [cssLoader, postcssLoader];
        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: {
                    sourceMap: true
                }
            });
        }
        return ExtractTextPlugin.extract({
            use: loaders,
            fallback: 'vue-style-loader'
        });
    }

    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', { indentedSyntax: true }),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    };
};

exports.styleLoader = function() {
    const loaders = exports.cssLoaders();
    const output = [];
    for (const extension in loaders) {
        const loader = loaders[extension];
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        });
    }
    return output;
};

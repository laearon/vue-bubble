const path = require('path');

function resolve(...args) {
    return path.join(__dirname, '../', ...args);
}

module.exports = {
    publicUrl: '/',
    srcPath: resolve('test/'),
    distPath: resolve('dist/'),
    subPublicUrl: 'static/',
    staticPath: resolve('static/')
};

var path = require('path');
var webpack = require('webpack');

var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
module.exports = {
    target: 'web',
    entry: ['babel-polyfill', './index.js'],
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.min.js',
        libraryTarget: 'umd',
        library: 'sensorlab-javascript-sdk'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['env', 'react']
                }
            }
        ]
    },
    externals: {
        'axios': 'axios'
    },
    plugins: [new UglifyJsPlugin({
        compressor: {
            warnings: false
        }
    })]
};
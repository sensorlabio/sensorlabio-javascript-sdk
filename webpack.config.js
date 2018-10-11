let path = require('path');
let webpack = require('webpack');

let UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

let webConfig = {
    target: 'web',
    entry: ['babel-polyfill', './src/index.js'],
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'web.min.js',
        libraryTarget: 'umd',
        library: 'SensorlabSDK'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: [
                    /(node_modules|bower_components|test|build)/,
                    path.resolve(__dirname, 'index.js'),
                ],
                loader: 'babel-loader',
                query: {
                    presets: ['env']
                }
            }
        ]
    },
    plugins: [new UglifyJsPlugin({
        compressor: {
            warnings: false
        }
    })]
}

let nodeConfig = {
    target: 'web',
    entry: ['./src/index.js'],
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.min.js',
        libraryTarget: 'umd',
        library: 'SensorlabSDK'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: [
                    /(node_modules|bower_components|test|build)/,
                    path.resolve(__dirname, 'index.js'),
                ],
                loader: 'babel-loader',
                query: {
                    presets: ['env']
                }
            }
        ]
    },
    plugins: [new UglifyJsPlugin({
        compressor: {
            warnings: false
        }
    })]
}

module.exports = [ webConfig, nodeConfig ];
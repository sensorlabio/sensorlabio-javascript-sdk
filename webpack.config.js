let path = require('path');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

let webConfig = {
    target: 'web',
    mode: 'production',
    entry: ['babel-polyfill', './src/index.js'],
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'web.min.js',
        libraryTarget: 'commonjs2',
        library: 'SensorlabSDK'
    },
    module: {
        rules: [
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
    optimization: {
        minimizer: [
            new UglifyJsPlugin()
        ]
    }
}

let nodeConfig = {
    target: 'node',
    mode: 'production',
    entry: ['./src/index.js'],
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.min.js',
        libraryTarget: 'commonjs2',
        library: 'SensorlabSDK'
    },
    module: {
        noParse: [/ws/],
        rules: [
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
        ],
    },
    externals: ['ws'],
    /*
    optimization: {
        minimizer: [
            new UglifyJsPlugin()
        ]
    }
    */
}

module.exports = [ webConfig, nodeConfig ];
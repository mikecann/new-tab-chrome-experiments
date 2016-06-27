var webpack = require("webpack");
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    entry: {
        index: './src/server/scripts/index.ts',
    },
    output: {
        path: path.join(__dirname, 'dist/server'),
        filename: "[name].js"
    },
    devtool: 'source-map',
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', 'd.ts', '.tsx', '.js']
    },
    externals: nodeModules,
    plugins: [
        //new webpack.optimize.UglifyJsPlugin()
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         // This has effect on the react lib size
        //         'NODE_ENV': JSON.stringify('production'),
        //     }
        // })
    ],
    module: {
        loaders: [
            { test: /\.ts(x?)$/, loader: 'ts-loader' },
        ]
    }
}
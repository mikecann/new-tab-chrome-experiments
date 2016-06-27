var webpack = require("webpack");
var path = require('path');

module.exports = {
    entry: {
        background: './src/extension/scripts/background/BackgroundPage.tsx',
        options: './src/extension/scripts/options/OptionsPage.tsx',
        newtab: './src/extension/scripts/newtab/NewTabPage.tsx',
        vendor: ["react", "react-dom", "moment", 
            "extension-services", "react-bootstrap", "axios", "immutable",
            "react-router"]
    },
    output: {
        path: path.join(__dirname, 'dist/extension') ,
        filename: "[name].bundle.js"
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', 'd.ts', '.tsx', '.js']
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            chunks: ["background", "options", "newtab"]
        })
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
            { test: /\.css?$/, loader: 'style!css' },
            { test: /\.(png|gif|jpg)$/, loader: 'url-loader?limit=8192' },
            { test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff2' },
            { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' }
        ]
    }
}
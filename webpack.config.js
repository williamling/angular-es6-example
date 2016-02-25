'use strict';
let path = require('path');
let webpack = require('webpack');

let CommonChunkPlugin = webpack.optimize.CommonsChunkPlugin;
let DedupePlugin = webpack.optimize.DedupePlugin;
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');

let config = {
    devtool: 'source-map',
    entry: {
        app: './src/app/app.js',
        vender: ['angular','angular-route','angular-ui-router','oclazyload','angular-ui-bootstrap'] 
    },
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js',
        path: './dist'
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'ng-annotate-loader!babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            },
            { test: /\.woff2$/, loader: 'file-loader?name=[name].[ext]' },
            { test: /\.woff$/, loader: 'file-loader?name=[name].[ext]' },
            { test: /\.ttf$/, loader: 'file-loader?name=[name].[ext]' },
            { test: /\.eot$/, loader: 'file-loader?name=[name].[ext]' },
            { test: /\.svg$/, loader: 'file-loader?name=[name].[ext]' },
            {
                test: /\.html$/,
                loader: 'raw-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new DedupePlugin(),
        new HtmlWebpackPlugin({
            template: './dev/index.html'
        }),
        new CommonChunkPlugin('vender', '[name].bundle.js'),
        new ExtractTextPlugin("[name].css")
    ]
};

module.exports = config;
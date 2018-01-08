const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.views.dev');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
webpackBaseConfig.plugins = [];

module.exports = merge(webpackBaseConfig, {
    output: {
        path: path.join(__dirname, '../public/viewsDist'),
        publicPath: '/public/viewsDist/',
        filename: '[name].[hash].js'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].[hash].css',
            allChunks: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new HtmlWebpackPlugin({
            filename: path.join(__dirname, '../public/views.html'),
            template: './public/index.ejs',
            inject: false
        }),
        new CleanWebpackPlugin(['viewsDist'], { root: path.join(__dirname, '../public/') })
    ]
});
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.views.dev');
const path = require('path');
webpackBaseConfig.plugins = [];

module.exports = merge(webpackBaseConfig, {
    output: {
        path: path.join(__dirname, '../public/js/dist'),
        publicPath: '/public/js/dist/',
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
            filename: './public/views.html',
            template: './public/index.ejs',
            inject: false
        })
    ]
});
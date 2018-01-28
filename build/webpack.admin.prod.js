const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.admin.dev');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
webpackBaseConfig.plugins = [];

module.exports = merge(webpackBaseConfig, {
    output: {
        path: path.join(__dirname, '../public/adminDist'),
        publicPath: '/public/adminDist/',
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
                warnings: false,
                drop_debugger: true,
                drop_console: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: path.join(__dirname, '../public/admin.html'),
            template: './public/admin.ejs',
            inject: false
        }),
        new CleanWebpackPlugin(['adminDist'], { root: path.join(__dirname, '../public/') }),
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
});
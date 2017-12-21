//管理台开发配置
const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpackBaseConfig = require('./webpack.config');
module.exports = merge(webpackBaseConfig, {
    entry: {
        main: './main_views.js'
    },
    output: {
        path: path.join(__dirname, './public/js/dist'),
        publicPath: '/public/js/dist/',
        filename: 'main_views.js'
    },
    plugins: [
        new ExtractTextPlugin('main_views.css')
    ]
});
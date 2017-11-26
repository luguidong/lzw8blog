
//管理台开发配置
const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpackBaseConfig = require('./webpack.config');
module.exports = merge(webpackBaseConfig,{
    entry:{
        main:'./main_admin.js'
    },
    output:{
        path: path.join(__dirname,'./static/js/dist'),
        publicPath: '/static/js/dist/',
        filename: 'main_admin.js'
    },
    plugins:[
        new ExtractTextPlugin('main_admin.css')
    ]
});
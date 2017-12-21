const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    watch: true,
    entry: {
        main: './main',
    },
    output: {
        path: path.join(__dirname, './static/js/dist'),
        publicPath: '/static/js/dist/',
        filename: 'main.js'
    },
    module: {
        rules: [
        {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    css: ExtractTextPlugin.extract({
                        use: 'css-loader?minimize',
                        fallback: 'vue-style-loader'
                    })
                }
            }
        },
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
                "presets": [
                    ['es2015', { modules: false }]
                ],
            }
        },
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: 'css-loader',
                fallback: 'style-loader'
            })
        },
        {
            test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
            loader: 'url-loader?limit=800000' //限制大小，如果大小小于1k，则转为base64
        }]
    },
    plugins: [
        new ExtractTextPlugin('main.css')
    ]
};

module.exports = config;
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    watch: true,

    entry: {
        main: './main',
    },
    output: {
        path: path.join(__dirname, './public/js/dist'),
        publicPath: '/public/js/dist/',
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
    ],
    devServer: {
        historyApiFallback: true,
        contentBase: "./",
        quiet: false, //控制台中不输出打包的信息
        noInfo: false,
        hot: true, //开启热点
        inline: true, //开启页面自动刷新
        lazy: false, //不启动懒加载
        progress: true, //显示打包的进度
        watchOptions: {
            aggregateTimeout: 300
        },
        port: '8080', //设置端口号
        //其实很简单的，只要配置这个参数就可以了
        proxy: {
            '/public/*': {
                target: 'http://localhost:3000',
                secure: false
            },
            '/api/*': {
                target: 'http://localhost:3000',
                secure: false
            }
        }

    }
};

module.exports = config;
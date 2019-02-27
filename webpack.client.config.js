const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
module.exports = {
    entry: {
        main: './src/main.js',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'build.js'
    },
    devServer: {
        // publicPath: '/dist/',
        host: '192.168.89.213',//自定义主机ip显示形式，
        open: true,//是否自动打开浏览器
        port: 8888,//端口号
        //解决跨域问题，但是服务器设置了cros同源策略已经解决了，这个只是拿来备用，以防万一
        proxy: {
            '/api': {
                target: "http://192.168.89.213:8889",
                changeOrigin: true,
                pathRewrite: {
                    '^/api': 'api',
                }
            }
        }
    },
    module: {
        rules: [{
                test: /\.css$/,
                loader: 'style-loader!css-loader!autoprefixer-loader'
            },{
                test: /\.less$/,
                loader: 'style-loader!css-loader!autoprefixer-loader!less-loader'
            },{
                test: /\.(jpg|png|eot|svg|ttf|woff|woff2|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 4096, //4096字节以上生成文件，否则base64
                    name: '[name].[ext]'
                }
            },{
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,//不检测node_modules模块
            },{
                test: /vue-preview.src.*?js$/,
                loader: 'babel-loader',
            },{
                test: /\.vue$/,
                loader: 'vue-loader'
            }],
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './index.html'
        }),
        new webpack.ProvidePlugin({
            jQuery: "jquery",
            $: "jquery"
        })
    ]
}
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
module.exports = {
    mode: "development",
    entry: {
        main: './src/main.js',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'build1.js'
    },
    module: {
        loaders: [{
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
                exclude: /node_modules/,
            },{
                test: /vue-preview.src.*?js$/,
                loader: 'babel-loader',
            },{
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            // template: './src/index.html'
        }),
        new webpack.ProvidePlugin({
            jQuery: "jquery",
            $: "jquery"
        })
    ]
}
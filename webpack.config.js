const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    entry: __dirname + "/app/main.js", //已多次提及的唯一入口文件
    /*
    *   main: __dirname + "/app/main.js",
        knockout: __dirname + "/app/knockout-3.2.0.js"
    * */
    output: {
        path: __dirname + "/build", //打包后的文件存放的地方
        filename: "bundle.js"//打包后输出文件的文件名
    },
    devServer: {
        contentBase: "./build",
        historyApiFallback: true, //不跳转
        inline: true//实时刷新
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },{
                        loader: "css-loader",
                        options: {
                            modules: true, //指定启用css modules
                            localIdentName: '[name]__[local]--[hash:base64:5]' //指定css的类名格式
                        }
                    }
                    ]
            },
            {
                test: /\.(jpg|jpeg|png|gif|ico|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            localIdentName: '[name].[hash].[ext]'
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            localIdentName: '[name].[hash:7].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            ko: 'knockout',
            $: 'jquery',
            axios: 'axios'
        })
    ]
};
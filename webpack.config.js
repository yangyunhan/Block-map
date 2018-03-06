const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    entry: __dirname + "/src/main.js", //已多次提及的唯一入口文件
    output: {
        path: __dirname + "/dist", //打包后的文件存放的地方
        filename: "bundle.js"//打包后输出文件的文件名
    },
    devServer: {
        contentBase: "./dist",
        historyApiFallback: true, //不跳转
        inline: true,//实时刷新
		hot: true
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
            },
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			}
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/src/index.tmpl.html"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            ko: 'knockout',
            $: 'jquery',
            axios: 'axios'
        }),
		new ExtractTextPlugin("style.css")
    ]
};
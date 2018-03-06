//webpack.production.config.js
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    entry: __dirname + "/src/main.js",
    output: {
        path: __dirname + "/dist",
        filename: "bundle-[hash].js"
    },
    devtool: "null",
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                    }]
                })
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
            ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/src/index.tmpl.html"
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("style.css"),

        new CleanWebpackPlugin('dist/*.*', {
            root: __dirname,
            verbose: true,
            dry: false
        }),
		new webpack.ProvidePlugin({
            ko: 'knockout',
            $: 'jquery',
            axios: 'axios'
        })
    ]
};
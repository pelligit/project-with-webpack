const path = require('path');
const webpack = require('webpack');

// 复制资源到另外的地方
const CopyWebpackPlugin = require('copy-webpack-plugin');

// 清除目录或文件
const CleanWebpackPlugin = require('clean-webpack-plugin');

// 定义HTML模板
// 多页应用打包
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 在webpack 4 版本中，mini-css-extract-plugin替代了extract-text-webpack-plugin
// 参考链接：https://github.com/webpack-contrib/mini-css-extract-plugin#mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 配置项
module.exports = {
	entry: {
		index: './src/index.js',
		test: './src/test.js',
		react: './src/react.js',
		common: './src/libs/common.js'
	},
	output: {
		// filename: '[name].[hash].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							// you can specify a publicPath here
							// by default it use publicPath in webpackOptions.output
							// publicPath: '../'
						}
					},
					'css-loader',
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader'
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					'file-loader'
				]
			},
			{
				test: /\.(csv|tsv)/,
				use: [
					'csv-loader'
				]
			},
			{
				test: /\.xml$/,
				use: [
					'xml-loader'
				]
			},
			{
				test: /\.md$/,
				use: [
					'html-loader',
					'markdown-loader',
				]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new CopyWebpackPlugin([
			{
				from: __dirname + '/src/assets',
				to: __dirname + '/dist/assets'
			},
			{
				from: __dirname + '/src/favicon.ico',
				to: __dirname + '/dist/favicon.ico'
			}
		]),
		new HtmlWebpackPlugin({
			title: '图形库游乐园',
			template: __dirname + '/src/index.html',
			filename: 'index.html',
			chunks: ['index'],
			inlineSource: '.(js|css)$',
			// 压缩HTML文件
			minify: {
				removeComments: true,
				collapseWhitespace: true
			}
		}),
		new HtmlWebpackPlugin({
			title: '测试的多页',
			template: __dirname + '/src/test.html',
			filename: 'test.html',
			chunks: ['test'],
			inlineSource: '.(js|css)$',
			minify: {
				removeComments: true,
				collapseWhitespace: true
			}
		}),
		new HtmlWebpackPlugin({
			// title: '测试的多页',
			template: __dirname + '/src/react.html',
			filename: 'react.html',
			chunks: ['react'],
			inlineSource: '.(js|css)$',
			minify: {
				removeComments: true,
				collapseWhitespace: true
			}
		}),
	]
};

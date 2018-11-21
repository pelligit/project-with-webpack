const merge = require('webpack-merge');
const common = require('./webpack.common');

// 在webpack4中，使用optimize-css-assets-webpack-plugin来压缩css
// 参考链接：https://github.com/webpack-contrib/mini-css-extract-plugin#minimizing-for-production
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

// 需同时配置uglifyjs-webpack-plugin来压缩js
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

// 在webpack 4 版本中，mini-css-extract-plugin替代了extract-text-webpack-plugin
// 参考链接：https://github.com/webpack-contrib/mini-css-extract-plugin#mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = merge(common, {
	mode: 'production',
	// devtool: 'source-map', // 产品模式下，无source-map
	output: {
		filename: '[name].[hash].js'
	},
	optimization: {
		minimizer: [
			new OptimizeCSSAssetsPlugin({}),
			new UglifyJsPlugin({
				sourceMap: true
			})
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: "[name].[hash].css",
			chunkFilename: "[id].[hash].css"
		})
	]
});
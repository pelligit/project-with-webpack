const merge = require('webpack-merge');
const common = require('./webpack.common');

// 在webpack 4 版本中，mini-css-extract-plugin替代了extract-text-webpack-plugin
// 参考链接：https://github.com/webpack-contrib/mini-css-extract-plugin#mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		port: 3456
	},
	output: {
		filename: '[name].js'
	},
	plugins: [
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: "[name].css",
			chunkFilename: "[id].css"
		})
	],
	optimization: {
		minimizer: [
			// 开发模式下，不压缩
		]
	},
});

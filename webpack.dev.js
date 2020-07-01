const webpack = require('webpack');
const merge = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
	cache: true,
	performance: {
		hints: false,
	},
	// devtool: 'inline-source-map',
	devServer: {
		open: false,
		contentBase: './dist',
	},
	optimization: {
		namedModules: true,
		namedChunks: true,
		nodeEnv: 'development',
		flagIncludedChunks: false,
		occurrenceOrder: false,
		sideEffects: false,
		usedExports: false,
		concatenateModules: false,
		noEmitOnErrors: false,
		checkWasmTypes: false,
		minimize: false,
		removeAvailableModules: false,
	},
	plugins: [
		new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('development') }),
		new webpack.EvalSourceMapDevToolPlugin({
			module: true,
			columns: true,
			exclude: [/jquery/],
		}),
		new webpack.NamedChunksPlugin(),
		new webpack.NamedModulesPlugin(),
	],
});
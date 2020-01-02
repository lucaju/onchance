const path = require('path');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
	// mode: 'development', //development || production
	cache: true,
	performance: {
		hints: false
	},
	entry: './src/app.js',
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	devtool: 'inline-source-map',
	devServer: {
		open: false,
		contentBase: './dist'
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
		removeAvailableModules: false
	},
	plugins: [
		new CopyWebpackPlugin([
			{ from: './src/assets', to: 'assets' },
			{ from: './videography/videos', to: 'videos' }
		]),
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			inject: 'body'
		}),
		new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development')}),
		new webpack.EvalSourceMapDevToolPlugin({
			module: true,
			columns: true,
			exclude: [/jquery/]
		}),
		new webpack.NamedChunksPlugin(),
		new webpack.NamedModulesPlugin(),
	],
});
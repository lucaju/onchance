const path = require('path');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
	// mode: 'production', //development || production
	entry: './src/app.js',
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	devtool: false,
	performance: {
		hints: 'warning'
	},optimization: {
		namedModules: false,
		namedChunks: false,
		nodeEnv: 'production',
		flagIncludedChunks: true,
		occurrenceOrder: true,
		sideEffects: true,
		usedExports: true,
		concatenateModules: true,
		noEmitOnErrors: true,
		checkWasmTypes: true,
		minimize: true,
		minimizer: [new TerserPlugin({
			cache: true,
			parallel: true,
			sourceMap: false//true
		})]
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
		new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')}),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.optimize.ModuleConcatenationPlugin(),
	]
});
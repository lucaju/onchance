const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	// mode: 'development', //development || production
	mode: 'production', //development || production
	entry: './src/app.js',
	output: {
		filename: 'app.bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	devServer: {
		contentBase: './dist'
	},
	devtool: '', //inline-source-map || 'source-map' || ''
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							// you can specify a publicPath here
							// by default it uses publicPath in webpackOptions.output
							publicPath: '../',
							hmr: process.env.NODE_ENV === 'production',
						},
					},
					'css-loader',
				],
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					'file-loader',
					{
						loader: 'image-webpack-loader',
						options: {
							bypassOnDebug: true, // webpack@1.x
							disable: true, // webpack@2.x and newer
						},
					},
				],
			},
			{
				test: /\.hbs$/,
				loader: 'handlebars-loader',
				options: {
					knownHelpersOnly: false,
					inlineRequires: /\/assets\/(:?images|audio|video)\//ig,
					helperDirs: [path.join(__dirname, '/lib/hbs-helpers')],
					// partialDirs: [path.join(PATHS.TEMPLATES, 'partials')],
				},
			}
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			inject: false,
			template: require('html-webpack-template'),
			appMountId: 'app',
			// appMountHtmlSnippet: '<div id="app2"></div>',
			// googleAnalytics: {
			// 	trackingId: 'UA-XXXX-XX',
			// 	pageViewOnLoad: true
			// },
			filename: 'index.html',
			meta: [
				{
					name: 'charset',
					content: 'utf-8'
				},
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'
				},
				{
					name: 'apple-mobile-web-app-capable',
					content: 'yes'
				}
			],
			title: 'On Chance'
		}),
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: '[name].css',
			chunkFilename: '[id].css',
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
			'window.$': 'jquery'
		}),
		// new StyleExtHtmlWebpackPlugin(),
		new CopyWebpackPlugin([
			// { from: './src/assets', to: 'assets' }
		]),
		new WebpackBar(),
		// new BundleAnalyzerPlugin()
	],
	optimization: {
		splitChunks: {
			chunks: 'all',
			minSize: 30000,
			maxSize: 0,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '~',
			name: true,
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true
				}
			}
		}
	}
};
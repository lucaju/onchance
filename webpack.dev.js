const webpack = require('webpack');
const merge = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
	cache: true,
	devtool: false,
	performance: { hints: false },
    output: { pathinfo: true },
	optimization: {
		checkWasmTypes: false,
        concatenateModules: false,
        flagIncludedChunks: false,
        namedModules: true,
        namedChunks: true,
        minimize: false,
        nodeEnv: 'development',
        noEmitOnErrors: false,
        occurrenceOrder: false,
        removeAvailableModules: false,
        sideEffects: false,
        usedExports: false,
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
        new webpack.NamedChunksPlugin(),
		new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('development') }),
		new webpack.EvalSourceMapDevToolPlugin({
            module: true,
            columns: true,
            exclude: [/react/]
        })
	],
});
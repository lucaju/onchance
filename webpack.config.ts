import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { ESBuildMinifyPlugin } from 'esbuild-loader';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import webpack, { EntryObject, ResolveOptions, RuleSetRule, WebpackPluginInstance } from 'webpack';
import WebpackBar from 'webpackbar';

const env = process.env.NODE_ENV;
const isDev = env === 'development' ? true : false;
const mode = isDev ? 'development' : 'production';
const watch = false;
const cache = isDev;
const devtool = isDev ? 'inline-source-map' : 'source-map';

const entry: EntryObject = {
  app: [path.resolve(__dirname, 'src', 'index.tsx')],
};

const output = {
  path: path.resolve(__dirname, 'dist'),
  pathinfo: isDev,
  publicPath: '/',
};

const resolve: ResolveOptions = {
  alias: { '@src': path.resolve(__dirname, 'src/') },
  extensions: ['.tsx', '.ts', '.js'],
};

const optimization = {
  emitOnErrors: isDev,
  minimize: isDev,
  minimizer: isDev ? [] : [new ESBuildMinifyPlugin({ target: 'es2020', css: true })],
  sideEffects: isDev,
  usedExports: isDev,
};

const plugins: WebpackPluginInstance[] = [
  new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
  new webpack.ProvidePlugin({ process: 'process/browser' }),
  new CopyWebpackPlugin({
    patterns: [
      { from: path.resolve(__dirname, 'src', 'assets'), to: 'assets' },
      // { from: path.resolve(__dirname, 'videos'), to: 'videos' },
    ],
  }),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src', 'index.html'),
    favicon: path.resolve(__dirname, 'src', 'assets', 'favicon-16x16.png'),
  }),
  new MiniCssExtractPlugin(),
  new WebpackBar({ color: env === 'development' ? '#7e57c2' : '#9ccc65' }),
  new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(env) }),
];

const rules: RuleSetRule[] = [
  {
    test: /\.tsx?$/,
    loader: 'esbuild-loader',
    options: { loader: 'tsx', target: 'es2020' },
  },
  { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
  {
    test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
    type: 'asset',
    generator: { filename: 'fonts/[name][ext][query]' },
  },
  {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
    generator: { filename: 'images/[name][ext][query]' },
  },
  { test: /\.svg$/, loader: 'svg-inline-loader' },
];

const hints = isDev ? false : 'warning';
const debug = isDev && false;
const stats = debug ? { children: true } : {};

const webpackConfig: webpack.Configuration = {
  cache,
  devtool,
  entry,
  mode,
  module: { rules },
  optimization,
  output,
  performance: { hints },
  plugins,
  resolve,
  stats,
  watch,
};

export default webpackConfig;

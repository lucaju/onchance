import { Express } from 'express';
import kleur from 'kleur';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../../webpack.config';


export const devServer = (app: Express) => {
	// webpack middleware and hot reload
	// config.entry.app.unshift('webpack-hot-middleware/client?reload=true&timeout=1000'); // Auto-reloading when webpack detects any changes
	// config.plugins.push(new webpack.HotModuleReplacementPlugin()); // Add HMR plugin
	const compiler = webpack(config);
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: '/',
      writeToDisk: true,
      stats: { colors: true },
    })
  );

	// Enable "webpack-hot-middleware"
	app.use(webpackHotMiddleware(compiler));
	console.log(kleur.bgBlue().black(`\n Dev Server is online!`));
};

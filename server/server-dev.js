const bodyParser = require('body-parser');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('../webpack.dev.js');

const dialogflow = require('./routers/dialogflow');
const video = require('./routers/video');

const app = express();

//Auto-reloading when webpack detects any changes
config.entry.app.unshift('webpack-hot-middleware/client?reload=true&timeout=1000');

//Add HMR plugin
config.plugins.push(new webpack.HotModuleReplacementPlugin()); 

const compiler = webpack(config);

//Enable "webpack-dev-middleware"
app.use(webpackDevMiddleware(compiler, {
	publicPath: config.output.publicPath
}));

//Enable "webpack-hot-middleware"
app.use(webpackHotMiddleware(compiler));

app.use(bodyParser.json({ limit: '5mb' })); // support json encoded bodies

//routers
app.use(dialogflow);
app.use(video);

//static
app.use(express.static('dist'));
app.use('/videos', express.static(__dirname + '/videos'));
app.use('/assets', express.static(__dirname + '/assets'));

app.use((req, res) => {
	res.status(404).send('404: Page not Found');
});

app.use((error, req, res) => {
	res.status(500).send('500: Internal Server Error');
});

module.exports = app;

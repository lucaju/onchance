const bodyParser = require('body-parser');
const express = require('express');

const dialogflow = require('./routers/dialogflow');
const video = require('./routers/video');

const app = express();

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

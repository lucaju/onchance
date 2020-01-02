const bodyParser = require('body-parser');
const express = require('express');

// const dialogFlow = require('./dialogflow.js');
// const videoSelection = require('./video-selection.js');

const dialogflowRouter = require('./routers/dialogflow');
const videoRouter = require('./routers/video');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
	extended: false
})); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies

app.use(express.static('dist'));
app.use('/videos', express.static(__dirname + '/videos'));
app.use('/assets', express.static(__dirname + '/assets'));

//routers
app.use(dialogflowRouter);
app.use(videoRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});


app.listen(port, () => console.log(`App listening on port ${port}!`));
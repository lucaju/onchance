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

app.use((req, res) => {
	res.status(404).send('404: Page not Found');
});

app.use((error, req, res) => {
	res.status(500).send('500: Internal Server Error');
});


app.listen(port, () => console.log(`App listening on port ${port}!`));
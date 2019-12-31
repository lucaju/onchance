const bodyParser = require('body-parser');
const express = require('express');

const dialogFlow = require('./dialogflow.js');
const videoSelection = require('./video-selection.js');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies
app.use(express.static('dist'));
app.use('/videos', express.static(__dirname + '/videos'));
app.use('/assets', express.static(__dirname + '/assets'));


app.post('/dialogflow', async (req, res) => {
	const msg = req.body.msg;
	const dialogRes = await dialogFlow.sendDialog(msg);
	res.send(dialogRes);
});

app.post('/getVideo', async (req, res) => {
	const data = req.body;
	const video = await videoSelection.getVideo(data);
	res.json(video);
});



app.listen(port, () => console.log(`App listening on port ${port}!`));
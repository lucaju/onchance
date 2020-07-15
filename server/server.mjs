import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import express from 'express';

import dialogflow from './routers/dialogflow.mjs';
import video from './routers/video.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, '..', 'dist');
const app = express();

app.use(bodyParser.json({ limit: '5mb' })); // support json encoded bodies

//dev
if (process.env.NODE_ENV === 'development') {
	const { devTools } = await import('./dev/dev.mjs');
	devTools(app);
}

//routers
app.use('/dialogflow', dialogflow);
app.use('/video', video);

//static
app.use(express.static('./dist'));

//catch all
app.get('*', (req, res) => {
	res.status(200).sendFile(path.join(publicPath, 'index.html'));
});

//error
app.use((req, res) => res.status(404).send('404: Page not Found'));
app.use((error, req, res) => res.status(500).send('500: Internal Server Error'));

export default app;

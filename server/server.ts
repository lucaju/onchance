import express from 'express';
import path from 'path';
import './db';
import dialogflow from './routers/dialogflow';
import general from './routers/general';
import video from './routers/video';

const publicPath = path.join(__dirname, '..', 'dist');
const server = express();

server.use(express.json({ limit: '5mb' })); // support json encoded bodies\

// dev server
const loadDevServer = async () => {
  const { devServer } = await import('./dev');
  devServer(server);
};

if (process.env.NODE_ENV === 'development') loadDevServer();

// routers
server.use('/dialogflow', dialogflow);
server.use('/video', video);
server.use('/general', general);

// static
server.use(express.static('./dist'));
server.use('/videos', express.static('./videos'));

// catch all
server.get('*', (req, res) => {
  res.status(200).sendFile(path.join(publicPath, 'index.html'));
});

// error
server.use((req, res) => res.status(404).send('404: Page not Found'));
// app.use((error, req, res) => res.status(500).send('500: Internal Server Error'));

export default server;

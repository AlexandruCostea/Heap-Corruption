import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes/api/postRoutes.js';
import dataGenerator from './utils/dataGenerator.js';
import postsData from './model/data.js';

import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router);

const server = http.createServer(app);
server.listen(3001, () => {
  console.log('WebSocket server is running at http://localhost:3001');
});

const wss = new WebSocketServer({ server });

const sendDataToClients = () => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(postsData));
    }
  });
};

const intervalSeconds = 10;

setInterval(() => {
  dataGenerator(20);
  sendDataToClients();
  console.log("Data updated");
}, intervalSeconds * 1000);

app.listen(port, () => {
  console.log(`Heap Corruption server is running at http://localhost:${port}`);
});
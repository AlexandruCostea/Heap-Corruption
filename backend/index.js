const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const {WebSocketServer, WebSocket} = require('ws');
const minimist = require('minimist');
const { Client } = require('pg');


const postRouter = require('./routes/api/postRoutes');
const userRouter = require('./routes/api/userRoutes');
const dataGenerator = require('./utils/dataGenerator');
const config = require('./config');


const app = express();
const port = 8080;

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', postRouter);
app.use('/', userRouter);

const server = http.createServer(app);
server.listen(3001, () => {
  console.log('WebSocket server is running at http://localhost:3001');
});

const wss = new WebSocketServer({ server });

const sendDataToClients = async () => {
  wss.clients.forEach(async client => {
    if (client.readyState === WebSocket.OPEN) {
      try {
        const dbClient = new Client({
          user: config.user,
          host: config.host,
          database: config.database,
          password: config.password,
        });
        dbClient.connect();
        const query = 'SELECT * FROM posts'
        const posts = await dbClient.query(query);
        const postList =  posts.rows;

        const userQuery = 'SELECT * FROM users';
        const users = await dbClient.query(userQuery);
        const userList = users.rows;

        const data = {
          posts: postList,
          users: userList
        }
        client.send(JSON.stringify(data));
        dbClient.end();
      } catch (err) {
        console.error('Error getting posts:', err);
      }
    }
  });
};

const argv = minimist(process.argv.slice(2));
if (argv.time && argv.nr) {
  setInterval(() => {
    dataGenerator(argv.nr);
    sendDataToClients();
    console.log(`Generated ${argv.nr} new posts`);
  }, argv.time * 1000);
}


app.listen(port, () => {
  console.log(`Heap Corruption server is running at http://localhost:${port}`);
});
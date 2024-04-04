import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes/api/postRoutes.js';
import dataGenerator from './utils/dataGenerator.js';

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router);

const intervalSeconds = 10;

setInterval(() => {
  dataGenerator(20);
}, intervalSeconds * 1000);

app.listen(port, () => {
  console.log(`Heap Corruption server is running at http://localhost:${port}`);
});
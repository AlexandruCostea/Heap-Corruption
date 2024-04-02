const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/api/postRoutes');

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', postRoutes);


app.listen(port, () => {
  console.log(`Heap Corruption server is running at http://localhost:${port}`);
});
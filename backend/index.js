const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const port = 3000;
const postRoutes = require('./routes/api/postRoutes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', postRoutes);


app.listen(port, () => {
  console.log(`Heap Corruption server is running at http://localhost:${port}`);
});
//Require all that's needed to power this App
//adding a few documentation
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import ArticleRoute from './routes/v1/ArticleRoute';

let cors = require('cors');
const app = express();
app.use(cors());

dotenv.config()

//=========================================================
//All Middlewares here
//=========================================================
// Tell the bodyparser middleware to accept more data
app.use(bodyParser.json({ limit: '400mb' }));
app.use(bodyParser.urlencoded({ limit: '400mb', extended: true }));
// Article Route
app.use(ArticleRoute);

//default landing:
app.all('*', (req, res) => {
  res.status(404).send({
    status: 'failed',
    status_code: 404,
    message: 'Resource not found',
  });
});

//=========================================================
//Running the server on Port 3000 default
let PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App is running on Port ${PORT}`);
});

module.exports = app;

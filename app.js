//Require all that's needed to power this App
//adding a few documentation
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import ValidateRoute from './routes/v1/ValidateRoute';

let cors = require('cors');
const app = express();
app.use(cors());

dotenv.config()

//=========================================================
//All Middlewares here
//=========================================================
app.use((req, res, next) => {
  bodyParser.json()(req, res, err => {
      if (err) {
        console.error(err);
        return res.status(400).send({
          message: "Invalid JSON payload passed.",
          status: "error",
          data: null
        }); 
      }

      next();
  });
});

app.use(bodyParser.urlencoded({ limit: '400mb', extended: true })); 
 
// Validate Route
app.use(ValidateRoute);

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

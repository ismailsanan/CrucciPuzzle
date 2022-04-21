'use strict';

require("dotenv").config() //can access the values in the .env using the process.env

const app = require('./app/app');

const port = process.env.PORT || 3001;

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
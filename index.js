// Main starting point of the application
"use strict"
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const logger = require('morgan');
const app = express();
//const router = require('./routes/index');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/index.json');

require('./models').connect(config.dbUri);
const router = require('./routes/index');
// App Setup

app.use(bodyParser.json({ type: '*/*' }));  //parse bodies of all incoming requests into JSON

// Allow cross-origin resource sharing
app.use(cors());
app.options('*', cors());

// Application Routes
router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;

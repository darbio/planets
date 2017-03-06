var express = require('express');
require('express-di');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var complaints = require('./routes/complaints');

var app = express();

// Inject publisher to api methods that need it
// This instance of the publisher can now be accessed as middleware from the
// api method using express-di
import { Publisher } from '../../../shared/publisher';
let publisher = new Publisher();
app.factory('publisher', function(req, res, next) {
  next(null, publisher);
});

// Inject bunyan logger to api methods that need it
import * as bunyan from 'bunyan';
let bunyanLogger = bunyan.createLogger({
  name : 'sun.api'
});
app.factory('logger', function(req, res, next) {
  next(null, bunyanLogger);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api/v1/complaints', complaints);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err: any = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
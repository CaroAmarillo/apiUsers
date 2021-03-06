/** Express router providing user related configuration
 * @module routers/users
 * @requires express
 * @requires favicon
 * @requires cookieParser
 * @requires bodyParser
 * @requires hbs
 * @requires index
 */

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const index = require('./routes/index');
const app = express();

/**
 * Method to configurate template engine
 * @name engine
 * @function
 * @memberof module:routers/users
 * @inner
 * @param {string} setting - handlebars
 */

app.engine(
  'hbs',
  hbs({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts/'
  })
);

/**
 * Method to set views folder
 * @name set
 * @function
 * @memberof module:routers/users
 * @inner
 * @param {string} views - __dirname, 'views'
 */

app.set('views', path.join(__dirname, 'views'));

/**
 * Method to set views engine
 * @name set
 * @function
 * @memberof module:routers/users
 * @inner
 * @param {string} view engine - 'view engine', 'hbs' -> handlebars
 */

app.set('view engine', 'hbs');

/** app.use favicon,bodyParser to handle post method, static files, etc */
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);

/**
 * Method to handle error
 * catch 404 and forward to error handler
 * @name use
 * @function
 * @memberof module:routers/users
 * @inner
 * @param {function} function - catch 404 error
 */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/**
 * Method to handle errors
 * and render
 * @name use
 * @function
 * @memberof module:routers/users
 * @inner
 * @param {function} function -set locals, only providing error in development,Render the error Page
 */

// error handler
app.use(function(err, req, res, next) {
  /** set locals, only providing error in development */
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  /** Render the error Page */
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var LokiStore = require('connect-loki')(session)
var rateLimit = require('express-rate-limit')
require('dotenv').config({path: './secrets.env'})

var themes = require('./src/routes/themes');
var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
var contentUpdate = require('./src/routes/content');
var demoRouter = require('./src/routes/demo'); 

//use importing and exporting to make the codebase reusable
var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(rateLimit({windowMs, max, message, headers}) )
//cookie sameSite, secure, 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'ckeditor5')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(session({
				 store: new LokiStore({ttl: 10000}),
				 secret: [process.env.SESSION_SECRET, "secret_session"], 
                 resave: false, 
				 saveUninitialized: true,
				 name: 'cookie-name',
				 httpOnly: true,
				 sameSite: 'lax',
				 maxAge: 1000*60*60*24*365
				 }) 
)

app.use('/themes', themes)
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', contentUpdate);
app.use('/', demoRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

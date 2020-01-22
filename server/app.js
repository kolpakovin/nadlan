var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apartmentsRouter = require('./routes/apartments');
var citiesRouter = require('./routes/cities')
const imagesRouter = require('./routes/images')

var app = express();
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/apartments', apartmentsRouter);
app.use('/cities', citiesRouter);
app.use('images', imagesRouter)

// app.use('/images', getImagesRouter)

app.listen(80);

module.exports = app;

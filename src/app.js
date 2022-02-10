const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const createError = require('http-errors');
const favicon = require('serve-favicon');
//require('./index');

const app = express();

// port
const port = process.env.PORT || 9000;

//import routes
const routes = require('./routes/index');
const routeApi = require('./routes/googleAPI');

// settings
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')));

app.use('/', routes);
app.use('/api', routeApi);

app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
    next(createError(404));
    res.render('error.html');
});*/

// error handler
/*app.use(function(err, req, res) {
    //set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error.html');
});*/

// listen server on port
app.listen(port, () => {
    console.log(`CORS-enabled, web server listening on port: ${port}`)
});

// process terminated
process.on('SIGTERM', () => {
    app.close(() => {
        console.log('Process terminated')
    })
});

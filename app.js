var express = require('express');
var bodyParser = require('body-parser');
var volleyball = require('volleyball');

var app = express();

app.use(volleyball);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if(req.method === "OPTIONS"){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE');
        return res.status(200).json({});
    }

    next();
});

const api_v1_routes = require('./API/v1/Routes/Route');

// Routes Handled By the Controllers.
app.use('/v1', api_v1_routes);

// Error Handlers.
app.use((req, res, next) => {
    const error = new Error('Not Found! - ' + req.originalUrl);
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            status: error.status || 500,
            message: error.message,
            stack: error.stack
    }});
});

module.exports = app;
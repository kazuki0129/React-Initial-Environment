// import my config file 
import config from './config'

// import express and path
const express = require('express')
const path = require('path')

// set server as express
const server = express();

// static path tp /public
server.use(express.static('public'));

// set view engine(on default, express look for views folder under root directory)
server.set('view engine', 'ejs');

// :localhost/
server.get('/', (req, res) => {
    res.render('index');
});

// to show msg abourt where we connect to on your terminal
server.listen(config.port, config.host, () => {
    console.info('Express listening on port ', config.port);
});
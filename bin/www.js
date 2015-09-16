#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../server');
var debug = require('debug')('repish-server:server');
var http = require('http');

var https = require('https');
var fs = require('fs');
var privateKey  = fs.readFileSync('./configure/server.key', 'utf8');
var certificate = fs.readFileSync('./configure/server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || '3001');
var httpsPort = normalizePort(process.env.httpsPORT || '3002');
app.set('port', httpsPort);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
httpsServer.listen(httpsPort,'0.0.0.0');
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

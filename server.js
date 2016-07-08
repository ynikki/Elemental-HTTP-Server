var net = require('net');
var util = require('util');
var fs = require('fs');
var http = require('http');
var querystring = require('querystring');
var url = require('url');

var CONFIG = require('./config');


var server = http.createServer( function (request, response) {
  // how you serve your client.
  console.log('hello');
  response.writeHead(200, {'Content-Type' : 'text/html'});
  // handleRequest(request,response);
});

server.on('request', handleRequest);

server.listen(CONFIG.PORT, function () {
  var serverPort = server.address().port;
  console.log('listening on http://localhost:', serverPort);
});

function handleRequest (request, response) {
  if (request.method === 'GET') {
    getHandler(request, response);
    console.log('GET');
  } if (request.method === 'POST'){
    // do POST stuff in here..
    postHandler(request);
  }
}

function postHandler (request) {
  // do POST stuff in here..
  request.on('data', function (chunk) {
    var requestFile = chunk.toString();
    console.log(requestFile,"blah");
  });
}

function getHandler (request, response) {
    // do GET stuff in here...
  fs.readFile('./public' + request.url, 'utf8', function (err, data) {
    if (err){
      fs.readFile('./public/404.html', 'utf8', function (err, data) {
        var errorFile = data.toString();
        response.writeHead(400, {'Content-Type' : 'text/html'});
        response.write(errorFile);
      });
      return;
    }
    var fileContent = data.toString();
    response.write(fileContent);
    response.end();
  });
}

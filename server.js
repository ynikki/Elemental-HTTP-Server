var net = require('net');
var util = require('util');
var fs = require('fs');
var http = require('http');
var querystring = require('querystring');
var url = require('url');

var CONFIG = require('./config');

function handleRequest (req, response) {
  fs.readFile('./public' + req.url, 'utf8', function (err, data) {
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

var server = http.createServer( function (req, response) {

  // how you serve your client.
  console.log('hello');
  response.writeHead(200);
  handleRequest(req,response);
});

server.on('request', function (req, response) {
  req.on('data', function (chunk) {
    console.log(chunk);
  });

  req.on('end', function () {
    server.close();
  });
});


server.listen(CONFIG.PORT, function () {
  var serverPort = server.address().port;
  console.log('listening on http://localhost:', serverPort);
});


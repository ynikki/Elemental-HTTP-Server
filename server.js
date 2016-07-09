var net = require('net');
var util = require('util');
var fs = require('fs');
var http = require('http');
var querystring = require('querystring');
var url = require('url');
//var htmlFileBody = ' ';
var outputFile = ' ';
var requestObj = "";
var elements = "";

var CONFIG = require('./config');


var server = http.createServer( function (request, response) {
  // how you serve your client.
  response.writeHead(200, {'Content-Type' : 'text/html'});
  // handleRequest(request,response);
  // function postHandler (request) {
    // do POST stuff in here..
    request.on('data', function (chunk) {
      var requestFile = chunk.toString();
      requestObj = querystring.parse(requestFile);
      console.log(requestObj);
    });

    request.on('end', function () {
      outputFile = "";
      outputFile = requestObj.elementName + '.html';
      var htmlFileBody = "";
      htmlFileBody += '<!DOCTYPE html>\n';
      htmlFileBody += '<html lang="en">\n';
      htmlFileBody += '<head>\n';
      htmlFileBody += '<meta charset="UTF-8">\n';
      htmlFileBody += '<title>The Elements -' + ' ' + requestObj.elementName + '</title>\n';
      htmlFileBody += '<link rel="stylesheet" href="/css/styles.css">\n';
      htmlFileBody += '</head>\n';
      htmlFileBody += '<body>\n';
      htmlFileBody += '<h1>' + requestObj.elementName + '</h1>\n';
      htmlFileBody += '<h2>' + requestObj.elementSymbol + '</h2>\n';
      htmlFileBody += '<h3>' + requestObj.elementAtomicNumber + '</h3>\n';
      htmlFileBody += '<p>' + requestObj.elementDescription + '</p>\n';
      htmlFileBody += '<p><a href="/">back</a></p>\n';
      htmlFileBody += '</body>\n';
      htmlFileBody += '</html>\n';

      fs.writeFile('./public/' + outputFile,htmlFileBody, 'utf8', function (err) {
        console.log(outputFile);
        console.log(htmlFileBody);
       });
    });
  // }
});

server.on('request', handleRequest);

server.listen(CONFIG.PORT, function () {
  var serverPort = server.address().port;
  console.log('listening on http://localhost:', serverPort);
});

function handleRequest (request, response) {
  // console.log(request);
  if (request.method === 'GET') {
    getHandler(request, response);
    console.log('GET');
  } if (request.method === 'POST'){
    // do POST stuff in here..
    // postHandler(request);
  }
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
    response.writeHead(200);
    response.write(fileContent);
    response.end();
  });
}

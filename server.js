var net = require('net');
var util = require('util');
var fs = require('fs');
var http = require('http');
var querystring = require('querystring');
var url = require('url');
var path = require('path');
//var htmlFileBody = ' ';
var outputFile = ' ';
var requestObj = "";
var elements = "";

var contentTypes = {
  '.html' : 'text/html',
  '.css' : 'text/css'
};

var CONFIG = require('./config');


var server = http.createServer( function (request, response) {
  // how you serve your client.
  response.writeHead(200, {'Content-Type' : contentTypes});  
  // handleRequest(request,response);
});

server.on('request', handleRequest);

server.on('connect', handleRequest);

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
  } if (request.method === 'PUT'){
    // do PUT stuff in here..
  } if (request.method === 'DELETE'){
    // do DELETE stuff in here..
  }
}


function postHandler (request) {
  // do POST stuff in here..
  request.on('data', function (chunk) {
    var requestFile = chunk.toString();
   console.log(requestFile);
    requestObj = querystring.parse(requestFile);
    // var localHost = request.headers.host;
    // var uri = url.parse(request.url).pathname;
    // var elementName = requestObj.elementName;
    // var filename = path.join(localHost, uri, elementName.toLowerCase() + '.html');
    console.log(requestObj);
    return;
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
    htmlFileBody += '<link rel="stylesheet" src="./css/styles.css" text="text/css">\n';
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
     });
  });
}

function getHandler (request, response) {
    // do GET stuff in here...
  fs.readFile('./public' + request.url, 'utf8', function (err, data) {
    if (err){
      fs.readFile('./public/404.html', 'utf8', function (err, data) {
        var errorFile = data.toString();
        response.writeHead(400);
        response.write(errorFile);
      });
      return;
    }  
    var fileContent = data.toString();
    response.writeHead(200, {'Content-Type' : contentTypes});
    response.write(fileContent);
    response.end();
  });
}

function putHandler (request) {

}

function deleteHandler (request) {

}
const PORT = 8000;
var http = require('http');
var WebSocketServer = require('websocket').server;
var static = require('node-static');
var fileServer = new static.Server('./public');

var server = http.createServer(function (request, response) {

    console.log(request.method);

    request.addListener('end', function () {

        fileServer.serve(request, response, function (e) {

            if (e && (e.status === 404)) {

                fileServer.serveFile('/index.html', 404, {}, request, response);
            }
        });

    }).resume();
});

server.listen(PORT, function () {

    console.log((new Date()) + ' Server is listening on port: ' + PORT);
});

wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

function originIsAllowed(origin) {

    return true;
}

wsServer.on('request', function(request) {

    var connectedPeople = [];

    if (!originIsAllowed(request.origin)) {

        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
    }

    var connection = request.accept(null, request.origin);
    connectedPeople.push(connection);
    console.log((new Date()) + ' Connection accepted.');

    connection.on('message', function(message) {

        if (message.type === 'utf8') {

            console.log('Received Message: ' + message.utf8Data);

            for (oneConnection of connectedPeople) {

                oneConnection.sendUTF(message.utf8Data);
            }
        }
    });

    connection.on('close', function(reasonCode, description) {

        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});
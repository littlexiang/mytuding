var WebSocketServer = require('websocket').server;
var http = require('http');

function genID() {
    return 'node' + Math.random().toString(36).substr(2)
        + Math.random().toString(36).substr(2);
}

var server = http.createServer(function (request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(8080, function () {
    console.log((new Date()) + ' Server is listening on port 8080');
});

wsServer = new WebSocketServer({
    httpServer: server,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false
});

var tudingClient = {
    req: function (content, wsConnection) {
        var postData = 'json=' + encodeURIComponent(content);
        var options = {
            hostname: 'm.ngs60.gypsii.cn',
            port: 80,
            path: '/tuding/index.php',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': postData.length
            }
        };
        var req = http.request(options, function (res) {
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            var _data = '';
            res.on('data', function (chunk) {
                _data += chunk;
            });
            res.on('end', function () {
                console.log("\n--->>\nresult:", _data);
                wsConnection.send(_data);
            });
        });

        req.on('error', function (e) {
            console.log('problem with request: ' + e.message);
        });

// write data to request body
        console.log('POST: json=' + content);
        req.write(postData);
        req.end();
    }
};

wsServer.on('request', function (request) {
    var connection = request.accept('echo-protocol', request.origin);
    console.log((new Date()) + ' Connection accepted.');

    connection.on('message', function (message) {
        tudingClient.req(message.utf8Data, connection);
    });
    connection.on('close', function (reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
    connection.on('error', function (e) {
        console.log('Connntion Error: ' + e);
    });
});
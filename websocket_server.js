const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8080 });
var clients = [];

wss.on('connection', function(ws) {
    var msg = "";

    ws.on('message', function(message) {
        console.log("Received message " + message);
        for (i in clients) {
            clients[i].send(message);
        }
    });

    ws.on('close', function() {
        // Elimino el client desconnectat de la llista de clients
        clients.splice(clients.indexOf(ws),1);
        console.log("S'ha donat de baixa un client. Número de connexions " + clients.length);
    });

    // Poso totes les connexions dins de clients[]
    clients.push(ws);
    console.log("Número de connexions " + clients.length);
});

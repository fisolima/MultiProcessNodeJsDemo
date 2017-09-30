const WebSocket = require('ws');
const ClientConnection = require('../entities/clientConnection');

function startup (server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', function connection(ws, req) {
        //const location = url.parse(req.url, true);
      
        let client = new ClientConnection(ws);
    });
}

module.exports = {
    startup: startup
};
const WebSocket = require('ws');
const ClientConnection = require('../entities/clientConnection');
const RoomManager = require('./roomManager');

function startup (server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', function connection(ws, req) {
        ws.send('Main server accepted connection', (err) => {if (err) console.log(err);});

        ws.on('message', (data) => RoomManager.getRoom(data).EnterClient(ws));
    });
}

module.exports = {
    startup: startup
};
const WebSocket = require('ws');
const ClientConnection = require('../entities/clientConnection');
const RoomManager = require('./roomManager');

function startup (server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', function connection(ws, req) {
        let payload = {
            type: 'message',
            data: 'Main server accepted connection'
        };

        ws.send(JSON.stringify(payload), (err) => {if (err) console.log(err);});

        ws.on('message', (data) => RoomManager.getRoom(data).EnterClient(ws));
    });
}

module.exports = {
    startup: startup
};
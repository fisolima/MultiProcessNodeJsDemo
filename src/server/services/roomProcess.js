const WebSocket = require('ws');
const ClientConnection = require('../entities/clientConnection');

const _roomName = process.argv[2];
const _clients = [];

process.on('message', (m, socketHandler) => {
    process.send(`Received message: ${m}`);

    if (m === 'client') {
        process.send(`Accepted client`);

        // generate ws from socket handler
        let wsSocket = new WebSocket([socketHandler, []], {
            protocolVersion: 13,
            extensions: {},
            protocol: '',
            maxPayload: 104857600,
        });

        let clientConnection = new ClientConnection(`${_roomName}_${_clients.length}`, wsSocket);

        clientConnection.OnClose((id) => {
            process.send(`Closed client ${id}`);

            for (let i=0; i<_clients.length; i++) {
                if (_clients[i]._id === id) {
                    _clients.slice(i, 1);
                    break;
                }
            }
        });

        clientConnection.OnMessage((id, data) => {
            process.send(`Client ${id} sent a message`);

            for (let i=0; i<_clients.length; i++) {
                if (_clients[i]._id === id)
                    _clients[i].SendMessage(`[YOU] - ${data}`);
                else
                    _clients[i].SendMessage(`[${id}] - ${data}`);
            }
        });

        _clients.push(clientConnection);
    }
});

process.on('disconnect', function() {
    process.exit();
});

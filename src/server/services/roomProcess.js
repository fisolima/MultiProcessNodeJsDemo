const WebSocket = require('ws');

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

        wsSocket.send('message from child process')

        _clients.push(wsSocket);
    }
});

process.on('disconnect', function() {    
    //process.send('Room terminated');
    process.exit();
});

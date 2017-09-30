
class ClientConnection {
    constructor(wsSocket) {
        this._ws = wsSocket;

        this._ws.on('message', function incoming(message) {
            console.log('received: ' + message.toString());
          });
    }

    SendMessage(message) {
        this._ws.send(message, (err) => {
            console.log('error sending message' + JSON.stringify(err));
        });
    }
}

module.exports = ClientConnection;

class ClientConnection {
    constructor(wsSocket, incomingCallback) {
        this._ws = wsSocket;

        incomingCallback = incomingCallback || ((message) => {
            console.log('received: ' + message.toString());
          });

        this._ws.on('message', incomingCallback);
    }

    SendMessage(message, errorCallback) {
        this._ws.send(message, (err) => {
            if (errorCallback)
                errorCallback(err);
            else
                console.log('Error sending message' + JSON.stringify(err));
        });
    }
}

module.exports = ClientConnection;
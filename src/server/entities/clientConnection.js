

class ClientConnection {
    constructor(id, wsSocket) {
        this._id = id;
        this._ws = wsSocket;

        let payload = {
            type: 'identity',
            data: id
        };

        this._ws.send(JSON.stringify(payload), (err) => {
            if (err)
                console.log('Error sending id: ' + JSON.stringify(err));
        });
    }

    OnMessage(callback) {
        this._ws.on('message', (data) => {
            callback(this._id, data);
        });
    }

    OnClose(callback) {
        this._ws.on('close', () => {
            callback(this._id);
        });
    }

    SendMessage(message) {
        let payload = {
            type: 'message',
            data: message || ''
        };

        this._ws.send(JSON.stringify(payload), (err) => {
            if (err)
                console.log('Error sending message: ' + JSON.stringify(err));
        });
    }
}

module.exports = ClientConnection;
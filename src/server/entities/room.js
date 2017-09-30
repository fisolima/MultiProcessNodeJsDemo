const fork = require('child_process').fork;
const uuidv4 = require('uuid').v4;
const path = require('path');

class Room {
    constructor(roomName) {
        this._name = roomName;
        this._id = uuidv4();        
        this._clients = [];

        let roomProcessModule =
            path.join(
                path.dirname(process.mainModule.filename),
                './services/roomProcess.js');

        console.log('RoomModule: ' + roomProcessModule);

        this._roomProcess = fork(roomProcessModule, [this._name]);
    }

    EnterClient(clientConnection) {
        this._roomProcess.send('client', clientConnection);
        this._clients.push(clientConnection);
    }
}

module.exports = Room;
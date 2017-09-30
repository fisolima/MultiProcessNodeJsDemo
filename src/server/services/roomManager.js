const Room = require('../entities/room');

var _rooms = [];

function buildRooms(roomNames) {
    _rooms = roomNames.map((roomName) => new Room(roomName));
}

function getRoomList() {
    return _rooms.map((room) => {
        return {
            id: room._id,
            name: room._name
        }
    });
}

module.exports = {
    buildRooms: buildRooms,
    getRoomList: getRoomList
}
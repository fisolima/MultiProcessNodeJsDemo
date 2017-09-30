
const _roomName = process.argv[2];
var _clients = [];

process.on('message', (m, clientConnection) => {
    if (m === 'client') {
        console.log(`Client entered in ${_roomName} room`);
    }
});

process.on('disconnect', function() {
    console.log('parent exited')
    process.exit();
});
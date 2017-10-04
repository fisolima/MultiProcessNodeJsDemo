const express = require('express');
const http = require('http');
const path = require('path');
const HomeController = require('./controllers/homeController');
const RoomController = require('./controllers/roomController');
const WebSocketCoordinator = require('./services/webSocketCoordinator');
const RoomManager = require('./services/roomManager');
var config = require('./config.json');

class App {
    constructor(/*your injection here*/) {
        this._express = express();
        this._port = process.env.PORT || config.port || 5000;

        RegisterRoutes(this);
    }

    Start() {        
        const server = http.createServer(this._express);
        
        WebSocketCoordinator.startup(server);

        RoomManager.buildRooms([
            'Bronze',
            'Silver',
            'Gold',
            'Platinum'
        ]);

        server.listen(this._port, function listening() {
            console.log('Listening on %d', server.address().port);
          });
    }

    Shutdown() {
        console.log('Shutdown');
    }
}

function RegisterRoutes(app) {
    app._express.use(express.static(path.join(__dirname, "../public")));

    app._express.get('/favicon.ico', (req, res) => {
        res.end();
    });

    app._express.use((new HomeController()).route);
    app._express.use((new RoomController()).route);

    app._express.use((req, res, next) => {
        next(new Error('[404] Not Found: ' + req.url));
    });
}

module.exports = App;
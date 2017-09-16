const express = require('express');
const http = require('http');
const path = require('path');
const HomeController = require('./controllers/homeController');
const WebSocketCoordinator = require('./services/webSocketCoordinator');

class App {
    constructor(/*your injection here*/) {
        this._express = express();
        this._port = process.env.PORT || 3000;

        RegisterRoutes(this);
    }

    Start() {        
        const server = http.createServer(this._express);
        
        WebSocketCoordinator.startup(server);

        server.listen(this._port, function listening() {
            console.log('Listening on %d', server.address().port);
          });
    }
}

function RegisterRoutes(app) {
    app._express.use(express.static(path.join(__dirname, "../public")));

    app._express.get('/favicon.ico', (req, res) => {
        res.end();
    });

    const homeController = new HomeController();

    app._express.use(homeController.route);

    app._express.use((req, res, next) => {
        next(new Error('[404] Not Found: ' + req.url));
    });
}

module.exports = App;
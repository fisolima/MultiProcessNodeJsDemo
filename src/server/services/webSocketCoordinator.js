const WebSocket = require('ws');

function startup (server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', function connection(ws, req) {
        //const location = url.parse(req.url, true);
      
        ws.on('message', function incoming(message) {
          console.log('received: ' + message.toString());
        });
      
        var timer = setInterval(() => {
            ws.send((new Date()).toString(), (err) => {
                if (err) {
                    console.log('ws terminated' + JSON.stringify(err));

                    clearInterval(timer);
                }                                        
            });
        }, 1000);            
    });
}

module.exports = {
    startup: startup
};
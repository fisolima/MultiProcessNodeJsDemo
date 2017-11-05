import {ServerMessageHandler} from '../services/ServerMessageHandler';

var Room = {
    template: '#room-template',
    props: ['room'],
    data() {
        return {
            clientId: 'not defined',
            message: '',
            ws: null,
            connected: false
        };
    },
    methods: {
        switchRoomConnect: function(roomId) {
            if (this.connected) {
                if (this.ws)
                    this.ws.close();

                this.ws = null;

                this.clientId = 'not defined';
            }
            else {
                let wsUrl = window.location.href.replace('http', 'ws');

                this.ws = new WebSocket(wsUrl);

                this.ws.onopen = () => {
                    ServerMessageHandler.ProcessMessage(this.room, 'Connection opened');

                    this.ws.send(roomId);
                };

                this.ws.onmessage = (event) => {
                    let payload = JSON.parse(event.data);

                    switch (payload.type) {
                        case 'message':
                            ServerMessageHandler.ProcessMessage(this.room, payload.data);
                            break;
                        case 'identity':
                            this.clientId = payload.data;
                            break;
                        default:
                            ServerMessageHandler.ProcessMessage(this.room, `Wrong data format: ${event.data}`);
                            break;
                    }
                    
                }

                this.ws.onclose = () => {
                    ServerMessageHandler.ProcessMessage(this.room, 'Connection closed');
                }
            }

            this.connected = !this.connected;
        },
        sendMessage: function() {
            if (!this.connected)
                return;

            this.ws.send(this.message);
        }
    }
};

export default Room;

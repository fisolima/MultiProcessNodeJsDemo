import {ServerMessageHandler} from '../services/ServerMessageHandler';

var Room = {
    template: '#room-template',
    props: ['room'],
    data() {
        return {
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
            }
            else {
                let wsUrl = window.location.href.replace('http', 'ws');

                this.ws = new WebSocket(wsUrl);

                this.ws.onopen = () => {
                    ServerMessageHandler.ProcessMessage(this.room, 'Connection opened');

                    this.ws.send(roomId);
                };

                this.ws.onmessage = (event) => {
                    ServerMessageHandler.ProcessMessage(this.room, event.data);
                }

                this.ws.onclose = () => {
                    ServerMessageHandler.ProcessMessage(this.room, 'Connection closed');
                }
            }

            this.connected = !this.connected;            
        }
    }
};

export default Room;

var Room = {
    template: '#room-template',
    props: ['room'],
    data() {
        return {connected: false}
    },
    methods: {
        switchRoomConnect: function(roomId) {
            console.log(roomId);

            this.connected = !this.connected;
        }
    }
};

export default Room;

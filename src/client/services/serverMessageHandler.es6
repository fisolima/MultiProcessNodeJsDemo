class ServerMessageHandler {
    static ProcessMessage(room, message) {
        let now = new Date();
        let h = now.getHours();
        let m = now.getMinutes();
        let s = now.getSeconds();

        let messageItem = document.createElement('li');
        
        messageItem.className = room.name + 'Msg';

        messageItem.innerHTML = `${h}:${m}:${s} [${room.name}] - ${message}`;

        let messageContainer = document.getElementById('output');
        
        messageContainer.appendChild(messageItem);

        messageContainer.scrollTop = messageContainer.scrollHeight;
    }
}

export {ServerMessageHandler}
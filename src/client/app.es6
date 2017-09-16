class App {
    constructor(/*your injections here*/) {
        this._container = document.createElement("h3");

        document.body.appendChild(this._container);
    }

    Startup() {
        console.log('App.Startup');

        console.log(window.location.href);

        const ws = new WebSocket('ws://localhost:3000');

        ws.onopen = () => {
            console.log('ws opened');
        };

        ws.onmessage = (event) => {
            console.log(event);

            this._container.innerHTML = event.data;
        }

        var timer = setInterval(() => {
            ws.send('client : ' + (new Date()).toString());
        }, 1500);

        ws.onclose = () => {
            clearInterval(timer);
        }
    }
}

export {App}
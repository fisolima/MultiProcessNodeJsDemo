import Vue from 'vue';
import {HttpClient} from './services/HttpClient';
import Room from './components/roomComponent';

console.log(Room);

class App {
    constructor(/*your injections here*/) {
        this._container = document.createElement("h3");

        document.body.appendChild(this._container);
    }

    Startup() {
        console.log('App.Startup');

        let self = this;

        let httpClient = new HttpClient(window.location.href);

        httpClient.GetJson('api/rooms', null, (err,data) => {
            if (err)
                return CatchError(err);

            self._mainBody = new Vue({
                el: '#mainBody',
                data: {
                    rooms: data
                },
                components: {
                    'room-component': Room
                }
            });
        });        

        //console.log(window.location.href);

        // const ws = new WebSocket('ws://localhost:3004');

        // ws.onopen = () => {
        //     console.log('ws opened');
        // };

        // ws.onmessage = (event) => {
        //     console.log(event);

        //     this._container.innerHTML = event.data;
        // }

        // var timer = setInterval(() => {
        //     ws.send('client : ' + (new Date()).toString());
        // }, 1500);

        // ws.onclose = () => {
        //     clearInterval(timer);
        // }
    }

    CatchError(err) {
        console.log(err);
    }
}

export {App}
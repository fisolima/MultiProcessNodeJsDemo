import Vue from 'vue';
import {HttpClient} from './services/HttpClient';
import Room from './components/roomComponent';

class App {
    constructor(/*your injections here*/) {
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
    }

    CatchError(err) {
        console.log(err);
    }
}

export {App}
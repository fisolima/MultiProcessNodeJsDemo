var App = require('./app');

const app = new App();

app.Start();

process.on('exit', (code) => {
    app.Shutdown();
});
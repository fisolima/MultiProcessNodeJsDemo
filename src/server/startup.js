var App = require('./app');

process.on('exit', (code) => {
    app.Shutdown();
});

const app = new App();

app.Start();
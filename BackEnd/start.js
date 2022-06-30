const config = require('config');
const app = require('./server');

app.listen(config.get('localServer.port'),config.get('localServer.host'));

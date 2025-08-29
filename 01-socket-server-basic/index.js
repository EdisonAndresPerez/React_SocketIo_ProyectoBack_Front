
require('dotenv').config();  

const ServerApp = require('./models/server')


const server = new ServerApp();


server.listen();
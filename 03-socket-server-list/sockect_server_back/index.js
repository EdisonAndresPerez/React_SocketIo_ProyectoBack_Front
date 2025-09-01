require('dotenv').config();  
const ServerApp = require('./models/server')

if(!process.env.PORT){
  console.log("⚠️ FALTA LA VARIABLE DE ENTORNO 'PORT'.")
}

const server = new ServerApp();
server.listen();
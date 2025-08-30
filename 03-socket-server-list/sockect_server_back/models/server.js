// =====================
// 1) DEPENDENCIAS
// =====================
const express    = require('express');
const http       = require('http');
const { Server } = require('socket.io');
const cors       = require('cors');
const Sockets    = require('./sockets')

// =====================
// 2) SERVIDOR (CLASE)
// =====================
class ServerApp {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    if (!process.env.PORT){
      throw new Error('Falta la variable de entorno PORT');
    }

    this.server = http.createServer(this.app);
    this.io = new Server(this.server, { cors: { origin: '*' } })

    this.state = { connectedCount: 0 };

    this.middleware();
    this.routes();

    this.sockets = new Sockets(this.io, this.state)
  }
  // =====================
  // 3) MIDDLEWARES
  // =====================
  middleware() {
    this.app.use(cors());
    this.app.use(express.static('public'))
  }
  // =====================
  // 4) RUTAS HTTP
  // =====================
  routes() {
    this.app.get('/', (_req, res) => {
      res.send('Servidor Socket.IO activo ✅');
    });
  }

  // =====================
  // 5) EVENTOS DE SOCKETS
  // =====================
  listen() {
    this.server.listen(this.port, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${this.port}`);
    });
  }
}

module.exports = ServerApp;


const express    = require('express');
const http       = require('http');
const { Server } = require('socket.io');
const cors       = require('cors');
const Sockets    = require('./sockets')
const usuariosRoutes = require('../routes/usuarios.routes')

class ServerApp {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = http.createServer(this.app);

    this.io = new Server(this.server, { cors: { origin: '*' } })

    this.state = { connectedCount: 0 };

    this.middleware();
    this.routes();
    this.sockets = new Sockets(this.io, this.state)
  }

  middleware() {
    this.app.use(cors());

  }

  routes() {
    this.app.get('/', (_req, res) => {
      res.send('Servidor Socket.IO activo ✅');
    });
    this.app.use('/api/usuarios', usuariosRoutes);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${this.port}`);
    });
  }
}

module.exports = ServerApp;

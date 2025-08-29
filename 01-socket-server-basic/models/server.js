

// =====================
// 1) DEPENDENCIAS
// =====================
const express = require('express');
const http    = require('http');
const { Server } = require('socket.io');
const cors    = require('cors');

const sockets = require('./sockets')

// =====================
// 2) SERVIDOR (CLASE)
// =====================
class ServerApp {

  constructor() {
    // --- Configuración base
    this.app = express();
    if (!process.env.PORT){
      throw new Error('Falta la variable de entorno PORT');
    }

    this.port = process.env.PORT;

    // --- HTTP + Socket.IO
    this.server = http.createServer(this.app);
    this.io = new Server(this.server, { cors: { origin: '*' } })

    // --- Estado simple
    this.state = {
      connectedCount: 0
    };


    // --- Bootstrap
    this.middleware();
    this.routes();
    this.sockets();

    this.sockets = new sockets(this.io, this.state)

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
  // 6) EVENTOS DE SOCKETS
  // =====================
  sockets() {
    // Helpers de logging locales a este método

    // Conexión entrante

    // Mensaje de bienvenida SOLO al cliente que entra

    // Aviso a los demás que alguien se conectó

    // Escuchar mensajes "normales"

    // 👂 Escuchar el mensaje que enviaste con setTimeout en el cliente

    // Manejo de errores de socket

    // Desconexión

  }

  // =====================
  // 7) LEVANTAR SERVIDOR
  // =====================
  listen() {
    this.server.listen(this.port, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${this.port}`);
    });
  }
}

module.exports = ServerApp;

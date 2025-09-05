const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const Sockets = require('./sockets');
const bandasRoutes = require('../routes/bandas.routes');
const gamesRoutes = require('../routes/games.routes');


const BandList = require('./band-list');
const GameList = require('./game-list')




class ServerApp {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = http.createServer(this.app);
    this.GameList = new GameList();
    this.BandList = new BandList();

    this.init();

    this.io = new Server(this.server, { cors: { origin: '*' } });

    this.state = { connectedCount: 0 };

    this.middleware();
    this.routes();
    this.sockets = new Sockets(this.io, this.state);
    
  }

  middleware() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  async init() {
    await this.BandList.loadInitialBands();
    console.log("🎸 Bandas iniciales cargadas desde la BD:", this.BandList.getBands());
    
    await this.GameList.loadInitialGames();
    console.log("🎮 Juegos iniciales cargados desde la BD:", this.GameList.getGames());
  }

  routes() {
    this.app.get('/', (_req, res) => {
      res.send('Servidor Socket.IO activo ✅');
    });

    this.app.use('/api/bandas', bandasRoutes);
    this.app.use('/api/games', gamesRoutes);
    this.app.use('/api/auth', require('../routes/auth.routes'));
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${this.port}`);
    });
  }
}

module.exports = ServerApp;

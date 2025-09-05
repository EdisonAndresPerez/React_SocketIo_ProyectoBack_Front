const BandList = require('./band-list.js');
const GameList = require('./game-list.js');

// models/sockets.js
class Sockets {
  constructor(io, state = {}) {
    this.io = io;
    this.state = state;

    this.bandList = new BandList();
    this.gameList = new GameList();

    // Load initial data
    this.loadInitialData();

    this.state.connectedCount ??= 0;

    this.logSrv = (...a) => console.log('🚀 [SERVIDOR]', ...a);
    this.logCon = (...a) => console.log('🔌 [CONEXIÓN]', ...a);
    this.logMsg = (...a) => console.log('💬 [MENSAJE]', ...a);
    this.logDis = (...a) => console.warn('❌ [DESCONECTADO]', ...a);
    this.logErr = (...a) => console.error('🔴 [ERROR]', ...a);

    this.registerHandlers();
  }

  async loadInitialData() {
    try {
      await this.bandList.loadInitialBands();
      await this.gameList.loadInitialGames();
    } catch (error) {
      this.logErr('Error cargando datos iniciales:', error);
    }
  }

  registerHandlers() {
    this.io.on('connection', (socket) => {
      this.state.connectedCount++;
      this.logCon(`ID=${socket.id} | Conectados=${this.state.connectedCount}`);

      // Enviar listas iniciales
      socket.emit('bandas', this.bandList.getBands());
      socket.emit('juegos', this.gameList.getGames());

      // === EVENTOS DE BANDAS ===
      socket.on('get-bandas', () => {
        this.logMsg(`Cliente ${socket.id} solicita lista de bandas`);
        socket.emit('bandas', this.bandList.getBands());
      });


      socket.on('add-band', async (newBand) => {
        try {
          this.logMsg(`Agregando banda:`, newBand);

          const created = await this.bandList.addBand(newBand?.name);

          if (created) {
            this.io.emit('band-added', created);
            this.logMsg(`✅ Banda "${created.name}" agregada`);
          } else {
            this.logErr('No se pudo crear la banda');
          }

        } catch (error) {
          this.logErr(`Error agregando banda:`, error);
        }
      });


      socket.on('delete-band', async (bandId) => {
        try {
          this.logMsg(`Eliminando banda ID: ${bandId}`);

          const success = await this.bandList.removeBand(bandId);

          if (success) {
            this.io.emit('band-deleted', bandId);
            this.logMsg('✅ Banda eliminada');
          } else {
            this.logErr(`No se pudo eliminar la banda con ID: ${bandId}`);
          }

        } catch (error) {
          this.logErr(`Error eliminando banda:`, error);
        }
      });


      socket.on('vote-band', async (bandId) => {
        const updatedBand = await this.bandList.increaseVotes(bandId);
        if (updatedBand) {
          this.io.emit('band-voted', updatedBand);
        }
      });


      socket.on('edit-band', async (data) => {
        try {
          const { id, newName } = data;
          this.logMsg(`Editando banda ID: ${id} → "${newName}"`);

          const updatedBand = await this.bandList.changeName(id, newName);

          if (updatedBand) {
            this.io.emit('band-edited', updatedBand);
            this.logMsg(`✅ Banda actualizada`);
          } else {
            this.logErr(`No se pudo actualizar la banda con ID: ${id}`);
          }

        } catch (error) {
          this.logErr(`Error editando banda:`, error);
        }
      });




      // === EVENTOS DE JUEGOS ===
      socket.on('get-games', () => {
        this.logMsg(`Cliente ${socket.id} solicita lista de juegos`);
        socket.emit('juegos', this.gameList.getGames());
      });

      socket.on('add-game', async (gameData) => {
        try {
          this.logMsg(`Agregando juego:`, gameData);

          // Extraer datos según la estructura que llega
          let gameName, gameGenre;
          
          if (gameData?.name && typeof gameData.name === 'object') {
            // Si name es un objeto: { name: { namegame: '...', genre: '...' } }
            gameName = gameData.name.namegame || gameData.name.name;
            gameGenre = gameData.name.genre;
          } else {
            // Si es estructura simple: { name: '...', genre: '...' }
            gameName = gameData?.name || gameData?.namegame || gameData?.nameGame;
            gameGenre = gameData?.genre;
          }

          // Debug logging
          this.logMsg(`Debug - gameName:`, gameName, `(tipo: ${typeof gameName})`);
          this.logMsg(`Debug - gameGenre:`, gameGenre, `(tipo: ${typeof gameGenre})`);

          if (!gameName || typeof gameName !== 'string') {
            this.logErr('No se proporcionó nombre válido del juego o no es string');
            return;
          }

          if (gameName.trim() === '') {
            this.logErr('El nombre del juego está vacío');
            return;
          }

          if (!gameGenre || typeof gameGenre !== 'string') {
            this.logMsg('No se proporcionó género válido, usando valor por defecto');
            gameGenre = 'Sin categoría';
          }

          if (gameGenre.trim() === '') {
            gameGenre = 'Sin categoría';
          }

          const created = await this.gameList.addGame(gameName.trim(), gameGenre.trim());

          if (created) {
            this.io.emit('game-added', created);
            this.logMsg(`✅ Juego "${created.namegame}" de categoría "${created.genre}" agregado`);
          } else {
            this.logErr('No se pudo crear el juego');
          }

        } catch (error) {
          this.logErr(`Error agregando juego:`, error);
        }
      });

      
      socket.on('delete-game', async (gameId) => {
        try {
          this.logMsg(`Eliminando Juego por ID: ${gameId}`);

          const success = await this.gameList.removeGame(gameId);

          if (success) {
            this.io.emit('game-deleted', gameId);
            this.logMsg('✅ Juego eliminado');
          } else {
            this.logErr(`No se pudo eliminar el juego con ID: ${gameId}`);
          }

        } catch (error) {
          this.logErr(`Error eliminando juego:`, error);
        }
      });

      socket.on('vote-game', async (gameId) => {
        try {
          const updatedGame = await this.gameList.increasePoints(gameId);
          if (updatedGame) {
            this.io.emit('game-voted', updatedGame);
            this.logMsg(`✅ Voto agregado al juego "${updatedGame.namegame}"`);
          }
        } catch (error) {
          this.logErr(`Error votando juego:`, error);
        }
      });

      socket.on('edit-game', async (data) => {
        try {
          const { id, newName, newGenre } = data;
          this.logMsg(`Editando juego ID: ${id} → "${newName}"`);

          const updatedGame = await this.gameList.changeNameGame(id, newName, newGenre || 'Sin categoría');

          if (updatedGame) {
            this.io.emit('game-edited', updatedGame);
            this.logMsg(`✅ Juego actualizado`);
          } else {
            this.logErr(`No se pudo actualizar el juego con ID: ${id}`);
          }

        } catch (error) {
          this.logErr(`Error editando juego:`, error);
        }
      });

      // === EVENTO DE DESCONEXIÓN ===
      socket.on('disconnect', () => {
        this.state.connectedCount--;
        this.logDis(`ID=${socket.id} | Conectados=${this.state.connectedCount}`);
      });

    });
  }
}

module.exports = Sockets;

const BandList = require('./band-list.js');

// models/sockets.js
class Sockets {
  constructor(io, state = {}) {
    this.io = io;
    this.state = state;

    this.bandList = new BandList();

    this.state.connectedCount ??= 0;

    this.logSrv = (...a) => console.log('🚀 [SERVIDOR]', ...a);
    this.logCon = (...a) => console.log('🔌 [CONEXIÓN]', ...a);
    this.logMsg = (...a) => console.log('💬 [MENSAJE]', ...a);
    this.logDis = (...a) => console.warn('❌ [DESCONECTADO]', ...a);
    this.logErr = (...a) => console.error('🔴 [ERROR]', ...a);

    this.registerHandlers();
  }

  registerHandlers() {
    this.io.on('connection', (socket) => {
      this.state.connectedCount++;
      this.logCon(`ID=${socket.id} | Conectados=${this.state.connectedCount}`);

      socket.emit('bandas', this.bandList.getBands())


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

    });
  }
}

module.exports = Sockets;

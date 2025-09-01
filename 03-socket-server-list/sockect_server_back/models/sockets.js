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


      socket.on('add-band', (newBand) => {
        try {
          this.logMsg(`Agregando banda:`, newBand);
          this.bandList.addBand(newBand?.name);

          const bands = this.bandList.getBands();
          const created = bands[bands.length - 1];

          this.io.emit('band-added', created);
          this.logMsg(`✅ Banda "${created?.name}" agregada`);

        } catch (error) {
          this.logErr(`Error agregando banda:`, error);
        }
      });


      socket.on('delete-band', (bandId) => {
        try {
          this.logMsg(`Eliminando banda ID: ${bandId}`);

          this.bandList.removeBand(bandId);

          this.io.emit('band-deleted', bandId);
          this.logMsg('✅ Banda eliminada')

        } catch (error) {
          this.logErr(`Error eliminando banda:`, error)
        }
      });

      socket.on('vote-band', async (bandId) => {
        const updatedBand = await this.bandList.increaseVotes(bandId);
        if (updatedBand) {
          this.io.emit('band-voted', updatedBand);
        }
      });

      socket.on('edit-band', (data) => {
        try {
          const { id, newName } = data;
          this.logMsg(`Editando banda ID: ${id} → "${newName}"`);
          this.bandList.changeName(id, newName);


          const bands = this.bandList.getBands();
          const updatedBand = bands.find(band => band.id === id);

          if (updatedBand) {
            this.io.emit('band-edited', updatedBand);
            this.logMsg(`✅ Banda actualizada`);
          }

        } catch (error) {
          this.logErr(`Error editando banda:`, error);
        }
      });
    });
  }
}

module.exports = Sockets;

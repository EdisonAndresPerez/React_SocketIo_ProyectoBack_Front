const BandList = require('./band-list.js');
const GameList = require('./game-list.js')

// models/sockets.js
class Sockets {
  constructor(io, state = {}) {
    this.io = io;
    this.state = state;

    // Lista de bandas
    //poder emitir eventos a todos los clientes conectados
    this.bandList = new BandList();
    //poder emitir evento de game
    this.GameList = new GameList();

    this.state.connectedCount ??= 0;

    this.logSrv = (...a) => console.log('🚀 [SERVIDOR]', ...a);
    this.logCon = (...a) => console.log('🔌 [CONEXIÓN]', ...a);
    this.logMsg = (...a) => console.log('💬 [MENSAJE]', ...a);
    this.logDis = (...a) => console.warn('❌ [DESCONECTADO]', ...a);
    this.logErr = (...a) => console.error('🔴 [ERROR]', ...a);

    // En cuanto se construya, ya registra los eventos
    this.registerHandlers();
  }

  registerHandlers() {
    this.io.on('connection', (socket) => {
      this.state.connectedCount++;
      this.logCon(`ID=${socket.id} | Conectados=${this.state.connectedCount}`);

      //emitir la lista de bandas al conectarse
      socket.emit('bandas', this.bandList.getBands())

      //emitir la lista de juegos al conectarse
      socket.emit('games', this.GameList.getGame())

      socket.emit('mensaje_bienvenida', '🎉 ¡Bienvenido/a al mini chat!');
      socket.broadcast.emit('mensaje', `👤 Usuario ${socket.id} se unió al chat`);


      // ==========================================
      // 🆕 EVENTOS DE BANDAS - SINCRONIZADOS CON FRONTEND
      // ==========================================


      socket.on('get-bandas', () => {
        this.logMsg(`Cliente ${socket.id} solicita lista de bandas`);
        socket.emit('bandas', this.bandList.getBands());
      });


      socket.on('add-band', (newBand) => {
        try {
          this.logMsg(`Agregando banda:`, newBand);

          // ✅ Agregar sin reemplazar this.bandList
          this.bandList.addBand(newBand?.name);

          // Obtener la banda creada (última en la lista)
          const bands = this.bandList.getBands();
          const created = bands[bands.length - 1];

          // Notificar creación puntual
          this.io.emit('band-added', created);

          // (Opcional) sincronización completa:
          // this.io.emit('bandas', bands);

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

      socket.on('vote-band', (bandId) => {
        try {
          this.logMsg(`Voto para banda ID: ${bandId} desde ${socket.id}`);

          // Usar tu método existente
          this.bandList.increaseVotes(bandId);

          // Obtener la banda actualizada para enviarla
          const bands = this.bandList.getBands();
          const updatedBand = bands.find(band => band.id === bandId);

          if (updatedBand) {
            // Notificar a TODOS los clientes
            this.io.emit('band-voted', updatedBand);
            this.logMsg(`✅ Voto registrado. Nueva cuenta: ${updatedBand.votes}`);
          }

        } catch (error) {
          this.logErr(`Error votando banda:`, error);
        }
      });

      socket.on('edit-band', (data) => {
        try {
          const { id, newName } = data;
          this.logMsg(`Editando banda ID: ${id} → "${newName}"`);

          // Usar tu método existente
          this.bandList.changeName(id, newName);

          // Obtener la banda actualizada
          const bands = this.bandList.getBands();
          const updatedBand = bands.find(band => band.id === id);

          if (updatedBand) {
            // Notificar a TODOS los clientes
            this.io.emit('band-edited', updatedBand);
            this.logMsg(`✅ Banda actualizada`);
          }

        } catch (error) {
          this.logErr(`Error editando banda:`, error);
        }
      });




      // ==========================================
      // EVENTOS ORIGINALES DE CHAT (SIN CAMBIOS)
      // ==========================================


      socket.on('mensaje', (data) => {
        const texto = String(data || '').trim();
        if (!texto) return;
        this.logMsg(`de ${socket.id}:`, texto);
        socket.broadcast.emit('mensaje', texto);
      });



      socket.on('mensaje de cliente a servidor', (payload) => {
        this.logMsg(`Evento personalizado de ${socket.id}:`, payload);
      });

      socket.on('mensaje de cliente a servidor2', (payload) => {
        this.logMsg(`Evento personalizado 2 de ${socket.id}:`, payload);
      });

      socket.on('error', (err) => {
        this.logErr(`Socket ${socket.id} error:`, err?.message || err);
      });

      socket.on('disconnect', (reason) => {
        this.state.connectedCount = Math.max(0, this.state.connectedCount - 1);
        this.logDis(`ID=${socket.id} | Motivo=${reason} | Conectados=${this.state.connectedCount}`);
        socket.broadcast.emit('mensaje', `🚪 Usuario ${socket.id} salió del chat`);
      });
    });

    this.logSrv('Sockets inicializados ✅');
  }
}

module.exports = Sockets;

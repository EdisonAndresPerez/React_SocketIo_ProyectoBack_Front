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
          this.logBand(`Agregando banda:`, newBand);

          // Agregar banda a la lista (asume que tu BandList tiene método addBand)
          this.bandList.addBand(newBand.name, newBand.id);

          // Notificar a TODOS los clientes
          this.io.emit('band-added', newBand);
          this.logBand(`✅ Banda "${newBand.name}" agregada`);

        } catch (error) {
          this.logErr(`Error agregando banda:`, error);
          socket.emit('band-error', { action: 'add', error: error.message });
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

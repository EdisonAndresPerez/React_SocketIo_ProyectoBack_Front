// models/sockets.js
class Sockets {
  constructor(io, state = {}) {
    this.io = io;
    this.state = state;
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

      socket.emit('mensaje_bienvenida', '🎉 ¡Bienvenido/a al mini chat!');
      socket.broadcast.emit('mensaje', `👤 Usuario ${socket.id} se unió al chat`);

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

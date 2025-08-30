
const socket = io();
//
socket.on('connect', () => {
  console.log(`¡Conectado al servidor! 🎉 ${socket.id}`);

});


socket.on('connect_error', (err) => {
  console.error(`Error de conexión: ${err.message}`);
});


socket.on('disconnect', (reason) => {
  console.warn(`Desconectado: ${reason}`);
});


socket.on('reconnect_attempt', (n) => {
  console.log(`Reintentando reconectar... (intento #${n})`);
});


socket.on('reconnect', (n) => {
 console.log(`Reconectado (intento #${n})`);
});

socket.on('reconnect_failed', () => {
console.error('No se pudo reconectar');
});



socket.on('mensaje', (data) => {
 console.log(`Mensaje recibido: ${data}`);
});


socket.on('bandas', (bands) => {
  console.log('🎸 Lista de bandas recibida:', bands);
})

socket.on('games', (games,) => {
  console.log('🎮 Lista de juegos recibida:', games);
});

// Ejemplo: evento personalizado a los 3s (puedes quitarlo)
setTimeout(() => {
  socket.emit('mensaje de cliente a servidor', { msg: 'cliente', nombre: 'andres' });
  agregarMensaje('Evento personalizado enviado al servidor', 'info');
}, 3000);

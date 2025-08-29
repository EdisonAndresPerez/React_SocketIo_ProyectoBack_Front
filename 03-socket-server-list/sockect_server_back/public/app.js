// Conecta al mismo origen (tu server sirve este archivo)
const socket = io({
  transports: ['websocket', 'polling'],
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 500,
  reconnectionDelayMax: 3000,
  timeout: 20000
});

// DOM refs
const formulario = document.querySelector('#formulario');
const inputMensaje = document.querySelector('#mensaje');
const mensajesContainer = document.querySelector('#mensajes');
const statusBadge = document.querySelector('#status');
const socketIdSpan = document.querySelector('#socket-id');
const connectionStatusSpan = document.querySelector('#connection-status');

// Utils
function agregarMensaje(mensaje, tipo = 'info') {
  const div = document.createElement('div');
  const clase =
    tipo === 'sent' ? 'primary' :
      tipo === 'received' ? 'success' :
        tipo === 'danger' ? 'danger' :
          tipo === 'warning' ? 'warning' : 'info';

  div.className = `alert alert-${clase} py-2 px-3 mb-2`;
  div.innerHTML = `
    <div class="small text-muted">${new Date().toLocaleTimeString()}</div>
    <div>${mensaje}</div>
  `;
  mensajesContainer.appendChild(div);
  mensajesContainer.scrollTop = mensajesContainer.scrollHeight;
}

// Auto focus
window.addEventListener('load', () => inputMensaje.focus());

// Submit → emitir mensaje con ACK
formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  const texto = inputMensaje.value.trim();
  if (!texto) return;

  // Emitimos y esperamos confirmación del server (ACK)
  socket.emit('mensaje', texto, (ack) => {
    if (ack?.ok) {
      agregarMensaje(`Tú: ${texto}`, 'sent');
      inputMensaje.value = '';
      inputMensaje.focus();
    } else {
      agregarMensaje('No se pudo enviar tu mensaje.', 'danger');
    }
  });
});

// Conectado
socket.on('connect', () => {
  statusBadge.textContent = 'Conectado';
  statusBadge.className = 'badge bg-success';
  socketIdSpan.textContent = socket.id;
  socketIdSpan.className = 'badge bg-success';
  connectionStatusSpan.textContent = 'Conectado';
  connectionStatusSpan.className = 'badge bg-success';

  mensajesContainer.innerHTML = '';
  agregarMensaje('¡Conectado al servidor! 🎉', 'success');

  // (Opcional) saludo inicial
  // socket.emit('mensaje', '👋 Hola desde el cliente!');
});

// Mensaje broadcast del servidor (texto plano)
socket.on('mensaje', (data) => {
  agregarMensaje(`Otro: ${data}`, 'received');
});

// Bienvenida directa del servidor
socket.on('mensaje_bienvenida', (data) => {
  agregarMensaje(data, 'info');
});

// Estados de conexión
socket.on('connect_error', (err) => {
  statusBadge.textContent = 'Error';
  statusBadge.className = 'badge bg-danger';
  connectionStatusSpan.textContent = 'Error de conexión';
  connectionStatusSpan.className = 'badge bg-danger';
  agregarMensaje(`Error de conexión: ${err.message}`, 'danger');
});

socket.on('reconnect_attempt', (n) => {
  statusBadge.textContent = 'Reconectando...';
  statusBadge.className = 'badge bg-warning';
  connectionStatusSpan.textContent = `Reintentando... (${n})`;
  connectionStatusSpan.className = 'badge bg-warning';
});

socket.on('reconnect', (n) => {
  statusBadge.textContent = 'Reconectado';
  statusBadge.className = 'badge bg-success';
  socketIdSpan.textContent = socket.id;
  connectionStatusSpan.textContent = 'Reconectado';
  connectionStatusSpan.className = 'badge bg-success';
  agregarMensaje(`Reconectado (intento #${n})`, 'success');
});

socket.on('reconnect_failed', () => {
  statusBadge.textContent = 'Desconectado';
  statusBadge.className = 'badge bg-danger';
  connectionStatusSpan.textContent = 'Falló reconexión';
  connectionStatusSpan.className = 'badge bg-danger';
  agregarMensaje('No se pudo reconectar 😓', 'danger');
});

socket.on('disconnect', (reason) => {
  statusBadge.textContent = 'Desconectado';
  statusBadge.className = 'badge bg-warning';
  socketIdSpan.textContent = 'No conectado';
  socketIdSpan.className = 'badge bg-secondary';
  connectionStatusSpan.textContent = 'Desconectado';
  connectionStatusSpan.className = 'badge bg-warning';
  agregarMensaje(`Desconectado: ${reason}`, 'warning');
});

socket.on('bandas', (bands) => {
  console.log('🎸 Lista de bandas recibida:', bands);
})

socket.on('games', (games, ) => {
  console.log('🎮 Lista de juegos recibida:', games);
});

// Ejemplo: evento personalizado a los 3s (puedes quitarlo)
setTimeout(() => {
  socket.emit('mensaje de cliente a servidor', { msg: 'cliente', nombre: 'andres' });
  agregarMensaje('Evento personalizado enviado al servidor', 'info');
}, 3000);

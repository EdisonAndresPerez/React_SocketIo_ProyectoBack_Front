# 🎸 Socket.IO Bandas Server

Servidor backend con Socket.IO para gestión en tiempo real de bandas de música con sistema de votación.

## 🚀 Características

- ✅ **Socket.IO** para comunicación en tiempo real
- ✅ **PostgreSQL** como base de datos
- ✅ **API REST** completa para operaciones CRUD
- ✅ **Logging centralizado** con diferentes niveles
- ✅ **Manejo de errores robusto**
- ✅ **Validación de datos**
- ✅ **CORS configurado**
- ✅ **Graceful shutdown**
- ✅ **Health checks**
- ✅ **Arquitectura modular y escalable**

## 📋 Requisitos Previos

- Node.js >= 16.0.0
- PostgreSQL >= 12
- npm o yarn

## 🛠️ Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repo-url>
   cd sockect_server_back
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   # Editar .env con tus configuraciones
   ```

4. **Configurar base de datos**
   ```sql
   -- Crear base de datos
   CREATE DATABASE react_socket_bd;
   
   -- Crear tabla de bandas
   CREATE TABLE bands (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL UNIQUE,
     votes INTEGER DEFAULT 0,
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );
   ```

## 🚦 Scripts Disponibles

```bash
# Desarrollo con auto-reload
npm run dev

# Desarrollo con debug de Socket.IO
npm run dev:debug

# Producción
npm start

# Verificar conexión a BD
npm run db:check
```

## 📡 API Endpoints

### Bandas
- `GET /api/bandas` - Obtener todas las bandas
- `POST /api/bandas` - Crear nueva banda
- `PUT /api/bandas/:id` - Actualizar banda
- `DELETE /api/bandas/:id` - Eliminar banda
- `PATCH /api/bandas/:id/vote` - Votar por banda

### Sistema
- `GET /` - Estado del servidor
- `GET /health` - Health check completo

## 🔌 Eventos Socket.IO

### Cliente → Servidor
- `get-bandas` - Solicitar lista de bandas
- `add-band` - Agregar nueva banda
- `delete-band` - Eliminar banda
- `vote-band` - Votar por banda
- `edit-band` - Editar nombre de banda

### Servidor → Cliente
- `bandas` - Lista completa de bandas
- `band-added` - Nueva banda agregada
- `band-deleted` - Banda eliminada
- `band-voted` - Voto registrado
- `band-edited` - Banda editada
- `error` - Error en operación

## 🏗️ Arquitectura

```
├── config/
│   ├── environment.js    # Configuración centralizada
│   └── logger.js        # Sistema de logging
├── controllers/
│   └── bandas.controller.js
├── middleware/
│   └── index.js         # Middleware personalizado
├── models/
│   ├── server.js        # Servidor principal
│   └── sockets.js       # Gestión de Socket.IO
├── routes/
│   └── bandas.routes.js
├── services/
│   └── band.service.js  # Lógica de negocio
├── database.js          # Conexión a PostgreSQL
└── index.js            # Punto de entrada
```

## 🔧 Configuración

### Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `PORT` | Puerto del servidor | `3000` |
| `NODE_ENV` | Entorno de ejecución | `development` |
| `PGHOST` | Host de PostgreSQL | `localhost` |
| `PGPORT` | Puerto de PostgreSQL | `5432` |
| `PGUSER` | Usuario de PostgreSQL | `postgres` |
| `PGPASSWORD` | Contraseña de PostgreSQL | `password` |
| `PGDATABASE` | Nombre de base de datos | `react_socket_bd` |
| `CORS_ORIGIN` | Origen permitido para CORS | `http://localhost:3000` |

## 🐛 Debug

Para activar logs de debug de Socket.IO:
```bash
DEBUG=socket.io* npm run dev
```

## 📊 Monitoreo

El servidor incluye endpoints de monitoreo:

- `/health` - Estado de salud completo
- Logs estructurados con diferentes niveles
- Métricas de conexiones activas
- Manejo de errores centralizado

## 🚀 Despliegue

1. **Variables de entorno de producción**
   ```bash
   NODE_ENV=production
   PORT=80
   # Configurar variables de BD de producción
   ```

2. **Iniciar en modo producción**
   ```bash
   npm start
   ```

## 🤝 Contribuir

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Crear Pull Request

## 📝 Licencia

ISC License

## 👨‍💻 Autor

Edison Andres Perez Martinez

const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const port = process.env.PORT || 3001;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Permitir todas las conexiones para desarrollo
  },
});

// Habilitar CORS
app.use(cors());

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ruta para recibir los datos del Arduino
app.post('/data', (req, res) => {
  const { temperature, humidity } = req.body;
  console.log(
    `Datos recibidos - Temperatura: ${temperature}, Humedad: ${humidity}`
  );

  // Emitir los datos a través de Socket.IO para que el frontend los reciba en tiempo real
  io.emit('sensorData', { temperature, humidity });

  res.sendStatus(200);
});

// Conexión de socket.io
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

server.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

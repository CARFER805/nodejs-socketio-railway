import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SensorData = () => {
  const [data, setData] = useState({ temperature: null, humidity: null });

  useEffect(() => {
    // Conectarse al backend usando Socket.IO
    const socket = io('http://localhost:3001');

    // Escuchar los datos de sensor enviados desde el backend
    socket.on('sensorData', (newData) => {
      setData(newData);
    });

    // Limpiar la conexión al desmontar el componente
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Temperatura: {data.temperature}°C</h1>
      <h1>Humedad: {data.humidity}%</h1>
    </div>
  );
};

export default SensorData;

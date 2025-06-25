import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import './types/express/index.d.ts'; // Importa tus tipos personalizados para Express

import userRoutes from './routes/UserRoute';
import catalogRoutes from './routes/catalogRoute';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors(
  {
    origin: process.env.CORS_ORIGIN || 'http://localhost:4200', // Cambia esto según tu frontend
    credentials: true, // Permite enviar cookies y encabezados de autorización
  }
)); // Configura CORS según necesidades
app.use(express.json()); // Para parsear JSON
app.use(cookieParser());

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI || '')
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch((err) => {
    console.error('Error conectando a MongoDB:', err);
  });

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/catalog', catalogRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.send('API funcionando');
});

// Manejo básico de errores 404
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
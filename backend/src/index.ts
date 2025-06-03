import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/UserRoute';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Configura CORS según necesidades
app.use(express.json()); // Para parsear JSON

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
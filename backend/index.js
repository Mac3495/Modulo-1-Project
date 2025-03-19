const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

require('dotenv').config(); // Cargar variables de entorno
const cors = require('cors');

const app = express();
// Conectar a MongoDB
connectDB();

// Middleware
app.use(express.json()); // Para leer JSON en requests
app.use(cors()); // Permitir peticiones desde el frontend

// Ruta de prueba
app.get('/', (_, res) => {
  res.send("API funcionando 🚀");
});

// Routes
app.use("/auth", authRoutes);
app.use('/tasks', taskRoutes); 
app.use('/user', userRoutes); 

// Iniciar servidor
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🔥 Servidor corriendo en el puerto ${PORT}`);
});

// =================================
// 🧠 SERVIDOR PRINCIPAL (sever.js)
// =================================

// Importaciones básicas
const express = require('express');
const path = require('path');
const cors = require("cors");
require("dotenv").config();

// Rutas
const tareasRoutes = require('./routes/tareasRoutes');
const authRoutes = require("./routes/authRoutes");

// conexión a la base de datos
const connectDB = require("./config/db");

// Crear servidor
const app = express();
const PORT = process.env.PORT || 3000; // Puerto por defecto 3000

// =========================
// conectar a MongoDB atlas
// =========================
connectDB(); // si falta, el proseso se detiene

// Aviso si falta JWT_SECRET
if (!process.env.JWT_SECRET) {
    console.log("⚠️ ATENCION: falta JWT_SECRET en el archivo .env");
}

// =========================
//  🧩 Middlewares globales
// =========================
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
}));        
app.use(express.json()); // Middleware para leer JSON
app.use(express.static(path.join(__dirname, 'public'))); // Servir archivos estáticos (carpeta "public")

// =============
// Rutas API
// =============
app.use("/api/auth", authRoutes);
app.use("/api/tareas", tareasRoutes);

// ================
// Ruta de prueba
// ================
app.get('/', (req, res) => {
    res.send('🚀 Servidor funcionando correctamente');
});

// ==================
// Iniciar servidor 
// ==================
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
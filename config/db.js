const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        // Verificar variable de entorno
        if (!process.env.MONGO_URI) {
        console.error("❌ ERROR: Falta MONGO_URI en .env");
        process.exit(1);
        }

        // Conexión
        await mongoose.connect(process.env.MONGO_URI, {
            autoIndex: true,               // útil para desarrollo
            maxPoolSize: 10,               // conexiones simultáneas
            serverSelectionTimeoutMS: 5000 // si no conecta en 5s -> error
        });

        console.log("📦 Conectado a MongoDB Atlas ✓");
    } catch (error) {
        console.error("❌ Error al conectar MongoDB:");
        console.error(error.message);
        process.exit(1); // detener server si DB no conecta
    }
};

module.exports = connectDB;

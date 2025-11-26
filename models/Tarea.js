const mongoose = require("mongoose");

const TareaSchema = new mongoose.Schema({
    titulo: { 
        type: String, 
        required: true
    },
    descripcion: { 
        type: String
    },
    prioridad: {
        type: String, 
        enum: ["Alta", "Media", "Baja"], 
        default: "Media" 
    },
    completada: { 
        type: Boolean, 
        default: false 
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    orden: { 
        type: Number, 
        default: 0
    }
}, {timestamps: true });

module.exports = mongoose.model("Tarea", TareaSchema);
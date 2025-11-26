const express = require('express');
const router = express.Router();
const auth = require("../middlewares/authMiddleware");

const {
    obtenerTareas,
    crearTarea,
    actualizarTarea,
    eliminarTarea,
    eliminarCompletadas,
    reordenarTareas,
} = require('../controllers/tareasController');

// ⚠️ Importante: rutas especificas ANTES de "/:id"
router.get("/", auth, obtenerTareas);
router.post("/", auth, crearTarea);
router.delete("/completadas", auth, eliminarCompletadas);
router.put("/reordenar", auth, reordenarTareas);
router.put("/:id", auth, actualizarTarea);
router.delete("/:id", auth, eliminarTarea)

module.exports = router;
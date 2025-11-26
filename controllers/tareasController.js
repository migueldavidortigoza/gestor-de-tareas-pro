const Tarea = require("../models/Tarea");

// GET /api/tareas → listar con orden
exports.obtenerTareas = async (req, res) => {
    try {
        const tareas = await Tarea.find({ usuario: req.usuario })
            .sort({ createdAt: -1 }); // ← FECHA REAL

        res.json(tareas);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener tareas" });
    }
};

// POST /api/tareas → Crear una tarea nueva
exports.crearTarea = async (req, res) => {
    try {
        const ultima = await Tarea.findOne({ usuario: req.usuario })
            .sort({ orden: -1 });

        const nuevoOrden = ultima ? ultima.orden + 1 : 0;

        const nueva = new Tarea({
            ...req.body,
            usuario: req.usuario, // ID del usuario dueño de la tarea
            orden: nuevoOrden
        });

        const guardada = await nueva.save();
        res.json(guardada);
        
    } catch (error) {
        res.status(500).json({ error: "error al crear tarea" });
    }
};

// PUT /api/tareas/:id → Actualizar tarea (editar o marcar completada)
exports.actualizarTarea = async (req, res) => {
    try {
        const tarea = await Tarea.findById(req.params.id);

        if (!tarea) 
            return res.status(404).json({ error: "Tarea no encontrada" });
        
        // Evitar que un usuario modifique la tarea de otro
        if (tarea.usuario.toString() !== req.usuario) {
            return res.status(401).json({ error: "No autorizado" });
        }

        tarea.titulo = req.body.titulo ?? tarea.titulo;
        tarea.descripcion = req.body.descripcion ?? tarea.descripcion;
        tarea.prioridad = req.body.prioridad ?? tarea.prioridad;
        tarea.completada = req.body.completada ?? tarea.completada;

        tarea.updatedAt = Date.now(); // 🔥 actualiza fecha

        const actualizada = await tarea.save();
        res.json(actualizada);

    } catch (error) {
        res.status(500).json({ error: "Error al actualizar tarea" });
    }
};

// DELETE /api/tareas/:id →  Eliminar una tarea
exports.eliminarTarea = async (req, res) => {
    try {
        const tarea = await Tarea.findById(req.params.id);

        if (!tarea)
            return res.status(404).json({ error: "Tarea no encontrada" });
        
        if (tarea.usuario.toString() !== req.usuario) {
            return res.status(401).json({ error: "No autorizado" });
        }

        await tarea.deleteOne ();
        res.json({ mensaje: "Tarea eliminada correctamente" });            

    } catch (error) {
        res.status(500).json({ error: "Error al eliminar tarea" });
    }
};

// DELETE /api/tareas/completadas → Elimina todas las tareas completadas
exports.eliminarCompletadas = async (req, res) => {
    try {
        await Tarea.deleteMany({ usuario: req.usuario, completada: true });
        res.json({ mensaje: "Tareas compleadas eliminadas" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar tareas completadas" });
    }
};

// PUT /api/tareas/reordenar → guardar nuevo arden (drag & drop)
exports.reordenarTareas = async (req, res) => {
    try {
        const { orden } = req.body; // array de IDs en orden visual

        if (!Array.isArray(orden)) {
            return res.status(400).json({ error: "Formato de orden invalido" });
        }

        // Validar que todas las tareas pertenezcan al usuario  
        const tareas = await Tarea.find({ usuario: req.usuario });
        const idsUsuario = tareas.map(t => t._id.toString());

        for (const id of orden) {
            if (!idsUsuario.includes(id)) {
                return res.status(401).json({ error: "Intento de modificacar tareas ajenas" });
            }
        }

        // Actualizar orden visual
        const promesas = orden.map((id, index) =>
            Tarea.findOneAndUpdate(
                { _id: id, usuario: req.usuario },
                { orden: index }
            )
        ); 

        await Promise.all(promesas);

        res.json({ mensaje: "Orden de tareas actualizado" });
        
    } catch (error) {
        res.status(500).json({ error: "Error al reordenar tareas" });
    }
};
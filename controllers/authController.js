const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// ========================
// 🔵 REGISTRO DE USUARIO
// ========================
exports.registrar = async (req, res) => {
    try {
        let { nombre, email, password } = req.body;

        // Normalizar email
        email = email.trim().toLowerCase();

        // Verificar si el email ya existe
        const existe = await Usuario.findOne({ email });
        if (existe)
            return res.status(400).json({ error: "El email ya está registrado" });

        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Crear usuario
        const nuevoUsuario = new Usuario({
            nombre,
            email,
            password: hash
        });

        await nuevoUsuario.save();
        
        res.json({ mensaje: "Usuario creado correctamente" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error del servidor al registrar usuario" });
    }
};


// =======================
// 🔵 LOGIN DE USUARIO
// =======================
exports.login = async (req, res) => {
    try {
        let { email, password } = req.body;

        email = email.trim().toLowerCase();

        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ error: "Credenciales inválidas" });
        }

        const coincide = await bcrypt.compare(password, usuario.password);
        if (!coincide) {
            return res.status(400).json({ error: "Credenciales inválidas" });
        }

        // Crear token JWT
        const token = jwt.sign(
            { id: usuario._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({ 
            token,
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error del servidor al iniciar sesión" });
    }
};

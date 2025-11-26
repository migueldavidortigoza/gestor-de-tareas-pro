const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.header("x-auth-token");

    if (!token) {
        return res.status(401).json({ error: "acceso denegado. No hay token." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded.id; // guardamos el id del usuario en la request
        next();
    } catch (error) {
        return res.status(400).json({ error: "Token inválido." });
    }
};  
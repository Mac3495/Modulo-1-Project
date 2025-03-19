const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    try {
        // Obtiene el token desde el header
        const token = req.header("Authorization").replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        // Verifica el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Encuentra al usuario usando el ID decodificado
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        // Asignamos el usuario autenticado al objeto req
        req.user = user;
        next();
    } catch (error) {
        console.error("Auth error:", error);
        res.status(401).json({ message: "Authentication failed", error });
    }
};

module.exports = authMiddleware;

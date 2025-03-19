const express = require('express');
const { getUser } = require('../controllers/user.controller'); // El controlador de usuario
const authMiddleware = require('../middleware/authMiddleware'); // El middleware de autenticación

const router = express.Router();

// Ruta para obtener la información del usuario autenticado
router.get('/me', authMiddleware, getUser);

module.exports = router;
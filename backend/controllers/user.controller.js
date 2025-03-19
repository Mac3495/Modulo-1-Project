const User = require("../models/User");

const getUser = async (req, res) => {
    try {
      // El id del usuario autenticado está en req.user.id (establecido en el middleware de autenticación)
      const userId = req.user.id;
  
      // Buscar al usuario en la base de datos por su id
      const user = await User.findById(userId); // No retornamos la contraseña
      const {_id, name, email} = user;
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Enviar la información del usuario (sin incluir la contraseña)
      res.status(200).json({ id: _id, name, email});
    } catch (error) {
      console.error('Error fetching user info:', error);
      res.status(500).json({ message: 'Error fetching user information' });
    }
  };

module.exports = { getUser };
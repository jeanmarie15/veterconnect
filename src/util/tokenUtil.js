const jwt = require('jsonwebtoken');

// Función para obtener el userId del token JWT
const getUserIdFromToken = (token) => {
    if (!token) throw new Error('Token is missing');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.user.userId; // Asegúrate de que esta ruta de acceso al id sea correcta según tu payload de token
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};

module.exports = { getUserIdFromToken };
const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Asegúrate de que este directorio exista
    },
    filename: function(req, file, cb) {
        // generar un nombre de archivo único en base a la fecha actual
        const uniqueSuffix = Date.now() + ""+ Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
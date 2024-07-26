const express = require('express');
const router = express.Router();
const License = require('../models/Licenses');
const sendResponse = require('../util/responseUtil'); // Asegúrate de ajustar la ruta según la ubicación de tu archivo


// create a new License
router.post('/', (req, res) => {
    License.create(req.body)
        .then(license => {
            sendResponse(res, true, "License created successfully", license);
        })
        .catch(error => {
            sendResponse(res, false, error.message);
        }
        );
}
);

// list all licenses
router.get('/', async (req, res) => {
    try {
        const licenses = await License.findAll();
        res.json(licenses);
    } catch (error) {
       res.json([])
    }
}
);

// get a single license by ID
router.get('/:id', async (req, res) => {
    try {
        const license = await License.findByPk(req.params.id);
        if (license) {
            res.json(license);
        } else {
            res.status(404).json({ message: 'License not found' });
        }
    } catch (error) {
        sendResponse(res, false, error.message);
    }
}
);

module.exports = router;

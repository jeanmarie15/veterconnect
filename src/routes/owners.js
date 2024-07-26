const express = require('express');
const router = express.Router();
const Owner = require('../models/Owners');
const Pet = require('../models/Pet');
const sendResponse = require('../util/responseUtil'); // Asegúrate de ajustar la ruta según la ubicación de tu archivo


// create a new Owner
router.post('/', (req, res) => {
    Owner.create(req.body)
        .then(data => {
            sendResponse(res, true, "Owner created successfully", data);
        })
        .catch(error => {
            sendResponse(res, false, error.message);
        }
        );
}
);

// list all Owners
router.get('/', async (req, res) => {
    try {
        const owners = await Owner.findAll();
        res.json(owners);
    } catch (error) {
        res.json([])
    }
}
);

// get a single Owner by ID
router.get('/:id', async (req, res) => {
    try {
        const owner = await Owner.findByPk(req.params.id);
        if (owner) {
            res.json(owner);
        } else {
            res.status(404).json({ message: 'Owner not found' });
        }
    } catch (error) {
        sendResponse(res, false, error.message);
    }
}
);

// get pets from owner
router.get('/pets/:id', async (req, res) => {
    try {
        const pets = await Pet.findAll({ where: { ownerId: req.params.id } });
        res.json(pets);
    } catch (error) {
        sendResponse(res, false, error.message);
    }
}
);

module.exports = router;
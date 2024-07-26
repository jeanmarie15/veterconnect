const express = require('express');
const Dewormer = require('../models/Dewormer'); // Ajusta la ruta según sea necesario
const router = express.Router();
const sendResponse = require('../util/responseUtil');
const { Op } = require('sequelize');

// create new dewormer
router.post('/', async (req, res) => {
    const dewormerData = req.body;
    try {
        const name = dewormerData.name?.toLowerCase();
        dewormerData.name = dewormerData.name?.toLowerCase();
        // find dewormer by name, with uppercase
        const vaccineExists = await Dewormer.findOne({
            where: { name }
        });
        if (vaccineExists) {
            sendResponse(res, false, "dewormer name is not unique", null, 'NO_UNIQUE_NAME');
            return;
        }
        const dewormer = await Dewormer.create(dewormerData);
        sendResponse(res, true, "Dewormer created successfully", {
            dewormerId: dewormer.dewormerId,
            name: dewormer.name
        });
    } catch (error) {
        sendResponse(res, false, error.message);
    }
});

// list all vaccines
router.get('/', async (req, res) => {
    try {
        const vaccines = await Dewormer.findAll();
        res.json(vaccines);
    } catch (error) {
        console.log("🚀 ~ router.get ~ error:", error)
        res.json([])
    }
});

// get a single dewormer by ID
router.get('/:id', async (req, res) => {
    try {
        const dewormer = await Dewormer.findByPk(req.params.id);
        if (dewormer) {
            res.json(dewormer);
        } else {
            sendResponse(res, false, "Dewormer not found", null, 'NOT_FOUND');
        }
    } catch (error) {
        sendResponse(res, false, error.message);
    }
});

// update a dewormer by ID
router.put('/:id', async (req, res) => {
    try {
        const dewormer = await Dewormer.findByPk(req.params.id);
        if (dewormer) {
            const dewormerData = req.body;
            const name = dewormerData.name?.toLowerCase();
            dewormerData.name = dewormerData.name?.toLowerCase();
            // find dewormer by name, with lowercase, ignoring the current dewormer
            const vaccineExists = await Dewormer.findOne({
                where: {
                    name,
                    dewormerId: { [Op.ne]: req.params.id }
                }
            });
            if (vaccineExists) {
                sendResponse(res, false, "dewormer name is not unique", null, 'NO_UNIQUE_NAME');
                return;
            }
            await dewormer.update(dewormerData);
            sendResponse(res, true, "Dewormer updated successfully", {
                dewormerId: req.params.id,
                name: dewormer.name
            });
        } else {
            sendResponse(res, false, "Dewormer not found", null, 'NOT_FOUND');
        }
    } catch (error) {
        sendResponse(res, false, error.message);
    }
});

// delete a dewormer by ID
// delete only if dewormer is not assigned to any appointment
router.delete('/:id', async (req, res) => {
    try {
        const dewormer = await Dewormer.findByPk(req.params.id);
        if (dewormer) {
            await dewormer.destroy();
            sendResponse(res, true, "Dewormer deleted successfully", dewormer);
        } else {
            sendResponse(res, false, "Dewormer not found", null, 'NOT_FOUND');
        }
    } catch (error) {
        sendResponse(res, false, error.message);
    }
});

module.exports = router;
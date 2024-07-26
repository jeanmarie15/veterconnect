const express = require('express');
const Vaccine = require('../models/Vaccines'); // Ajusta la ruta según sea necesario
const router = express.Router();
const sendResponse = require('../util/responseUtil');
const { Op } = require('sequelize');

// create new vaccine
router.post('/', async (req, res) => {
    const vaccineData = req.body;
    try {
        const name = vaccineData.name?.toLowerCase();
        vaccineData.name = vaccineData.name?.toLowerCase();
        // find vaccine by name, with uppercase
        const vaccineExists = await Vaccine.findOne({
            where: { name }
        });
        if (vaccineExists) {
            sendResponse(res, false, "vaccine name is not unique", null, 'NO_UNIQUE_NAME');
            return;
        }
        const vaccine = await Vaccine.create(vaccineData);
        sendResponse(res, true, "Vaccine created successfully", {
            vaccineId: vaccine.vaccineId,
            name: vaccine.name
        });
    } catch (error) {
        sendResponse(res, false, error.message);
    }
});

// list all vaccines
router.get('/', async (req, res) => {
    try {
        const vaccines = await Vaccine.findAll();
        res.json(vaccines);
    } catch (error) {
        console.log("🚀 ~ router.get ~ error:", error)
        res.json([])
    }
});

// get a single vaccine by ID
router.get('/:id', async (req, res) => {
    try {
        const vaccine = await Vaccine.findByPk(req.params.id);
        if (vaccine) {
            res.json(vaccine);
        } else {
            sendResponse(res, false, "Vaccine not found", null, 'NOT_FOUND');
        }
    } catch (error) {
        sendResponse(res, false, error.message);
    }
});

// update a vaccine by ID
router.put('/:id', async (req, res) => {
    try {
        const vaccine = await Vaccine.findByPk(req.params.id);
        if (vaccine) {
            const vaccineData = req.body;
            const name = vaccineData.name?.toLowerCase();
            vaccineData.name = vaccineData.name?.toLowerCase();
            // find vaccine by name, with lowercase, ignoring the current vaccine
            const vaccineExists = await Vaccine.findOne({
                where: {
                    name,
                    vaccineId: { [Op.ne]: req.params.id }
                }
            });
            if (vaccineExists) {
                sendResponse(res, false, "vaccine name is not unique", null, 'NO_UNIQUE_NAME');
                return;
            }
            await vaccine.update(vaccineData);
            sendResponse(res, true, "Vaccine updated successfully", {
                vaccineId: req.params.id,
                name: vaccine.name
            });
        } else {
            sendResponse(res, false, "Vaccine not found", null, 'NOT_FOUND');
        }
    } catch (error) {
        sendResponse(res, false, error.message);
    }
});

// delete a vaccine by ID
// delete only if vaccine is not assigned to any appointment
router.delete('/:id', async (req, res) => {
    try {
        const vaccine = await Vaccine.findByPk(req.params.id);
        if (vaccine) {
            await vaccine.destroy();
            sendResponse(res, true, "Vaccine deleted successfully", vaccine);
        } else {
            sendResponse(res, false, "Vaccine not found", null, 'NOT_FOUND');
        }
    } catch (error) {
        sendResponse(res, false, error.message);
    }
});

module.exports = router;
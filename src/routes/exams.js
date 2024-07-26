const express = require('express');
const Exam = require('../models/Exam'); // Ajusta la ruta según sea necesario
const router = express.Router();
const sendResponse = require('../util/responseUtil');
const { Op } = require('sequelize');

// create new exam
router.post('/', async (req, res) => {
    const examData = req.body;
    try {
        const name = examData.name?.toLowerCase();
        examData.name = examData.name?.toLowerCase();
        // find exam by name, with uppercase
        const vaccineExists = await Exam.findOne({
            where: { name }
        });
        if (vaccineExists) {
            sendResponse(res, false, "exam name is not unique", null, 'NO_UNIQUE_NAME');
            return;
        }
        const exam = await Exam.create(examData);
        sendResponse(res, true, "Exam created successfully", {
            examId: exam.examId,
            name: exam.name
        });
    } catch (error) {
        sendResponse(res, false, error.message);
    }
});

// list all vaccines
router.get('/', async (req, res) => {
    try {
        const vaccines = await Exam.findAll();
        res.json(vaccines);
    } catch (error) {
        console.log("🚀 ~ router.get ~ error:", error)
        res.json([])
    }
});

// get a single exam by ID
router.get('/:id', async (req, res) => {
    try {
        const exam = await Exam.findByPk(req.params.id);
        if (exam) {
            res.json(exam);
        } else {
            sendResponse(res, false, "Exam not found", null, 'NOT_FOUND');
        }
    } catch (error) {
        sendResponse(res, false, error.message);
    }
});

// update a exam by ID
router.put('/:id', async (req, res) => {
    try {
        const exam = await Exam.findByPk(req.params.id);
        if (exam) {
            const examData = req.body;
            const name = examData.name?.toLowerCase();
            examData.name = examData.name?.toLowerCase();
            // find exam by name, with lowercase, ignoring the current exam
            const vaccineExists = await Exam.findOne({
                where: {
                    name,
                    examId: { [Op.ne]: req.params.id }
                }
            });
            if (vaccineExists) {
                sendResponse(res, false, "exam name is not unique", null, 'NO_UNIQUE_NAME');
                return;
            }
            await exam.update(examData);
            sendResponse(res, true, "Exam updated successfully", {
                examId: req.params.id,
                name: exam.name
            });
        } else {
            sendResponse(res, false, "Exam not found", null, 'NOT_FOUND');
        }
    } catch (error) {
        sendResponse(res, false, error.message);
    }
});

// delete a exam by ID
// delete only if exam is not assigned to any appointment
router.delete('/:id', async (req, res) => {
    try {
        const exam = await Exam.findByPk(req.params.id);
        if (exam) {
            await exam.destroy();
            sendResponse(res, true, "Exam deleted successfully", exam);
        } else {
            sendResponse(res, false, "Exam not found", null, 'NOT_FOUND');
        }
    } catch (error) {
        sendResponse(res, false, error.message);
    }
});

module.exports = router;
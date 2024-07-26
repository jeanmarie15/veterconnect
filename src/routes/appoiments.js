const express = require('express');
const router = express.Router();
const db = require('../config/db'); 

// GET all appointments
router.get('/', (req, res) => {
    db.query('SELECT * FROM appoiments', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

// GET a specific appointment
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query(`SELECT * FROM appoiments WHERE id = ${id}`, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

// CREATE a new appointment
router.post('/', (req, res) => {

});

// UPDATE an existing appointment
router.put('/:id', (req, res) => {
    // Your code here
});

// DELETE an appointment
router.delete('/:id', (req, res) => {
    // Your code here
});

module.exports = router;
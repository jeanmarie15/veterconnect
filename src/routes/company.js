const express = require('express');
const Company = require('../models/Company'); // Ajusta la ruta según sea necesario
const Licence = require('../models/Licenses'); // Ajusta la ruta según sea necesario
const Setting = require('../models/Settings'); // Ajusta la ruta según sea necesario

const router = express.Router();

// Create a new company
router.post('/', (req, res) => {
    // create new company
    Company.create(req.body)
        .then(company => {
            res.json(company);
        })
        .catch(error => {
            res
                .status(500)
                .send(error.message);
        }
        );
});

// Get all companies with their licences and settings
router.get('/', async (req, res) => {
    try {
        const companies = await Company.findAll({
            include: [
                { model: Licence, as: 'licence' },
                { model: Setting, as: 'setting' }
            ],
        });
        res.json(companies);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get a single company by ID
router.get('/:id', async (req, res) => {
    // get company by ID
    try {
        const company = await Company.findByPk(req.params.id, {
            include: [
                { model: Licence, as: 'licence' },
                { model: Setting, as: 'setting' }
            ]
        });
        res.json(company);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Update a company by ID
router.put('/:id', async (req, res) => {
    Company.update(req.body, {
        where: { companyId: req.params.id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'Company was updated successfully.'
                });
            } else {
                res.send({
                    message: `Cannot update Company with id=${req.params.id}. Maybe Company was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error updating Company with id=' + req.params.id
            });
        });
});

// Delete a company by ID
router.delete('/:id', async (req, res) => {
    Company.destroy({
        where: {
            companyId: req.params.id
        }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: 'Company was deleted successfully!'
            });
        } else {
            res.send({
                message: `Cannot delete Company with id=${req.params.id}. Maybe Company was not found!`
            });
        }
    })
        .catch(err => {
            res.status(500).send({
                message: 'Could not delete Company with id=' + req.params.id
            });
        });
});

module.exports = router;
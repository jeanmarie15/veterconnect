const express = require('express');
const router = express.Router();
const Owner = require('../models/Owners');
const Pet = require('../models/Pet');
const sendResponse = require('../util/responseUtil');
const upload = require('../config/uploadConfig');
const fs = require('fs');
const path = require('path');

// create new pet
router.post('/', upload.single('avatar'), async (req, res) => {
    const petData = req.body;
    if (req.file) {
        // solo el nombre del archivo
        petData.avatar = req.file.filename;
    } else {
        petData.avatar = 'default.png'; // Si no se sube una imagen, se asigna una por defecto
    }
    try {
        const pet = await Pet.create(petData);
        const petWithOwner = await Pet.findByPk(pet.petId, {
            include: [
                { model: Owner, as: 'owner' },
            ],
        });
        sendResponse(res, true, "Pet created successfully", petWithOwner);
    } catch (error) {
        sendResponse(res, false, error.message);
    }
});

// list all pets
router.get('/', async (req, res) => {
    try {
        const pets = await Pet.findAll({
            include: [
                { model: Owner, as: 'owner' },
            ],
        });
        res.json(pets);
    } catch (error) {
        console.log("🚀 ~ router.get ~ error:", error)
        res.json([])
    }
}
);

// get a single pet by ID

router.get('/:id', async (req, res) => {
    try {
        // find pet by primary key
        // include owner data
        const pet = await Pet.findByPk(req.params.id, {
            include: [
                { model: Owner, as: 'owner' },
            ],
        });
        if (pet) {
            res.json(pet);
        } else {
            res.status(404).json({ message: 'Pet not found' });
        }
    } catch (error) {
        sendResponse(res, false, error.message);
    }
}
);

// update a pet by ID
router.post('/edit', upload.single('avatar'), async (req, res) => {
    // get pet data from request body
    const petData = req.body;
    console.log("🚀 ~ router.post ~ petData:", petData)
    // get pet ID from request body
    const petId = petData.petId;
    // find pet by primary key
    const pet = await Pet.findByPk(petId);
    if (!pet) {
        sendResponse(res, false, 'Pet not found');
        return;
    }
    if (req.file) {
        petData.avatar = req.file.filename;
        // delete previous avatar
        if (pet.avatar && pet.avatar !== 'default.png') {
            // get only the file name from pet.avatar, lastIndexOf('/') + 1
            const fileName = pet.avatar.substring(pet.avatar.lastIndexOf('/') + 1);
            console.log("🚀 ~ router.post ~ fileName:", fileName)
            const previousAvatarPath = path.join(__dirname, '../../uploads/', fileName);
            fs.unlink(previousAvatarPath, (err) => {
                if (err) {
                    console.error("Failed to delete previous avatar:", err);
                    // Consider how you want to handle this error. 
                    // For example, you might want to continue with the update or return an error response.
                }
            });
        }
    }
    try {
        // update pet data
        await Pet.update(petData, {
            where: { petId: petId }
        });
        // get updated pet data
        const updatedPet = await Pet.findByPk(petId, {
            include: [
                { model: Owner, as: 'owner' },
            ],
        });
        sendResponse(res, true, 'Pet updated successfully', updatedPet);
    } catch (error) {
        sendResponse(res, false, error.message);
    }
}
);

module.exports = router;
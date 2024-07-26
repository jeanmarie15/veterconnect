const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Company = require('../models/Company');
const User = require('../models/User');
const Setting = require('../models/Settings');
const sendResponse = require('../util/responseUtil');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10; // El costo del procesamiento, 10 es un valor recomendado
const { getUserIdFromToken } = require('../util/tokenUtil');

// create account
router.post('/', async (req, res) => {
    try {
        const accountData = req.body;
        // check if email or username exists
        const find = await User.findOne({
            where: {
                [Op.or]: [
                    { email: accountData.email },
                    { username: accountData.username }
                ]
            }
        });

        if (find) {
            sendResponse(res, true, "Email or username already exists");
            return;
        }
        // valida que la contraseña tenga al menos 5 caracteres
        if (accountData.password.length < 5) {
            sendResponse(res, false, "Password must be at least 5 characters");
            return;
        }

        // check if company name exists
        let company = await Company.findOne({
            where: {
                rif: accountData.company.rif
            }
        })
        if (!company) {
            // create settings for new company
            const settings = await Setting.create();
            // create company with name and empty data
            company = await Company.create({
                rif: accountData.company.rif,
                name: accountData.company.name,
                address: accountData.company.address,
                phone: accountData.company.phone,
                email: accountData.email,
                avatar: 'default.png',
                settingId: settings.settingId
            })
        }
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(accountData.password, salt);

        // create user with company id
        const newUser = await User.create({
            username: accountData.username,
            email: accountData.email,
            password: hash,
            companyId: company.companyId
        })
        // exclude password from response
        const user = await User.findOne({
            where: {
                userId: newUser.userId
            },
            include: {
                model: Company,
                as: 'company'
            },
            attributes: { exclude: ['password'] }
        });
        if (user) {
            // Generar un token JWT
            const token = jwt.sign({
                user
            }, process.env.JWT_SECRET, { expiresIn: '24h' });
            sendResponse(res, true, "Account created successfully", { user, token });
        } else {
            sendResponse(res, false, "Error creating user");
        }
    } catch (error) {
        sendResponse(res, false, error.message);
    }
});

// get user profile with company

router.get('/', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Extrae el token del header
        const userId = getUserIdFromToken(token);
        const user = await User.findOne({
            where: {
                userId
            },
            include: {
                model: Company,
                as: 'company'
            },
            attributes: { exclude: ['password'] }
        });
        if (user) {
            sendResponse(res, true, "User profile", user);
        } else {
            sendResponse(res, false, "User not found");
        }
    } catch (error) {
        sendResponse(res, false, error.message);
    }
});

module.exports = router;
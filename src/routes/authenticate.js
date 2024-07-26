const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Company = require('../models/Company');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sendResponse = require('../util/responseUtil');
const { getUserIdFromToken } = require('../util/tokenUtil');

//pre login
router.post('/prelogin', async (req, res) => {
    try {
        // find user by email or username
        const userData = req.body;
        if (!userData.email && !userData.username) {
            sendResponse(res, false, "Email or username is required");
            return;
        }
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { email: userData?.email || '' },
                    { username: userData?.username || '' }
                ]
            },
            include: {
                model: Company,
                as: 'company'
            },
            defaultScope: {
                attributes: { exclude: ['password'] }
            }
        });
        if (!user) {
            sendResponse(res, false, "Email or username incorrect");
            return;
        }
        user.password = undefined;
        sendResponse(res, true, "User found", { user });
    } catch (error) {
        
    }
});

//login
router.post('/login', async (req, res) => {
    try {
        const userData = req.body;
        if ((!userData.email && !userData.username) || !userData.password) {
            sendResponse(res, false, "Email and password are required");
            return;
        }
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { email: userData?.email || '' },
                    { username: userData?.username || '' }
                ]
            },
            include: {
                model: Company,
                as: 'company'
            }
        });
        if (!user) {
            sendResponse(res, false, "Email or password incorrect");
            return;
        }
        const match = await bcrypt.compare(userData.password, user.password);
        if (!match) {
            sendResponse(res, false, "Email or password incorrect");
            return;
        }
        user.password = undefined;
        const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '24h' });
        sendResponse(res, true, "Login successful", { user, token });
    } catch (error) {
        sendResponse(res, false, error.message);
    }
}
);

// update passoword
router.post('/setPassword', async (req, res) => {
    try {
        const data = req.body;
        const oldPassword = data.oldPassword;
        const newPassword = data.newPassword;
        const token = req.headers.authorization?.split(' ')[1]; // Extrae el token del header
        const userId = getUserIdFromToken(token);
        const user = await User.findByPk(userId);
        if(!user){
            sendResponse(res, false, 'User not found');
            return;
        }
        const match = await bcrypt.compare(oldPassword, user.password);
        if (!match) {
            sendResponse(res, false, "Old password incorrect");
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);
        user.password = hash;
        await user.save();
        sendResponse(res, true, "Password updated successfully");
    } catch (error) {
        sendResponse(res, false, error.message);
    }
});

module.exports = router;
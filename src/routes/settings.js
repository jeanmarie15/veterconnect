const express = require('express');
const router = express.Router();
const Setting = require('../models/Settings');
const Company = require('../models/Company');
const User = require('../models/User');
const sendResponse = require('../util/responseUtil');
const { getUserIdFromToken } = require('../util/tokenUtil');

// get settings from company
router.get('/', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Extrae el token del header
        const userId = getUserIdFromToken(token);
        const user = await User.findByPk(userId);
        if (!user) {
            sendResponse(res, false, 'User not found');
            return;
        }
        // get company from user
        const company = await Company.findByPk(user.companyId);
        if (!company) {
            sendResponse(res, false, 'Company not found');
            return;
        }
        const settings = await Setting.findByPk(company.settingId);
        if (settings) {
            sendResponse(res, true, '', settings);
        } else {
            sendResponse(res, false, 'Settings not found');
        }
    } catch (error) {
        sendResponse(res, false, error.message);
    }
});

// add settings for company
router.post('/update', async (req, res) => {
    try {
        // get user from token
        const token = req.headers.authorization?.split(' ')[1]; // Extrae el token del header
        const userId = getUserIdFromToken(token);
        const user = await User.findByPk(userId);
        if (!user) {
            sendResponse(res, false, 'User not found');
            return;
        }
        // get company from user
        const company = await Company.findByPk(user.companyId);
        if (!company) {
            sendResponse(res, false, 'Company not found');
            return;
        }
        // get settings from company
        const settings = await Setting.findByPk(company.settingId);
        if (!settings) {
            sendResponse(res, false, 'Settings not found');
            return;
        }
        // update settings
        settings.update(req.body);
        sendResponse(res, true, '', settings);
    } catch (error) {
       sendResponse(res, false, error.message);
    }
});

module.exports = router;
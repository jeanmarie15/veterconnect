// utils/responseUtil.js
function sendResponse(res, status, message, data = null, errorCODE) {
    res.json({
        success: status,
        message: message,
        data: data,
        ...(errorCODE && { code: errorCODE }),
    });
}
module.exports = sendResponse;
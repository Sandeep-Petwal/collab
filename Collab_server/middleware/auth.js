const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const { sendResponse } = require("../utils/response.js")



// authentication middleware
module.exports = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return sendResponse(res, 401, 'Unauthorized');
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return sendResponse(res, 401, 'Unauthorized');
        req.user = decoded;
        next();
    });
}   
const CLIENT_URL = process.env.CLIENT_URL;
const nodeMailer = require('../utils/nodeMailer');
const crypto = require('crypto')
const handlebars = require('handlebars')
const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcrypt')
const { users, sessions } = require("../models")
const validate = require("../utils/validator.js");
const { sendResponse } = require("../utils/response.js")
const { registerTemplate } = require("../utils/constants/emailTemplates.js");

const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

function isValidEmailProvider(email) {
    const validProviders = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'protonmail.com', 'yopmail.com'];
    const domain = email.split('@')[1];
    return validProviders.includes(domain);
}


// Register
const registerUser = async (req, res) => {

    const { email, password, name } = req.body;
    const rules = {
        name: "required|string",
        email: "required|string|email|unique:users,email",
        password: "required|string|min:3",
    }

    let { status, message } = await validate({ email, password, name }, rules);
    if (!status) return sendResponse(res, 400, message);
    if (!isValidEmailProvider(email)) return sendResponse(res, 400, `Invalid email provider (${email.split('@')[1]}).`)


    // create a verification verificationToken
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours expiry
    let verification_url = `${CLIENT_URL}/verification?token=${verificationToken}`;


    // sending email
    const compiledHtmlTemplate = handlebars.compile(registerTemplate);
    const html = compiledHtmlTemplate({ name, url: verification_url });

    try {
        await nodeMailer.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: `Verify Your Email Address (Valid : 24HR)`,
            text: `Hello ${name}, Please Verify your email\n${verification_url}`,
            html
        });
    } catch (err) {
        console.log(err)
        return sendResponse(res, 500, 'Error sending verification email');
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    // creating user
    users.create({ name, email, password: hashedPassword, verificationToken, tokenExpiry });
    return sendResponse(res, 200, "Verification link sent to your email.")

};

// Verify email controller
const verifyEmail = async (req, res) => {
    const { token } = req.query;
    if (!token) return sendResponse(res, 400, "Provide a token.");

    const user = await users.findOne({ where: { verificationToken: token } });
    if (!user) return sendResponse(res, 400, "Invalid verification token.");

    const now = new Date();
    if (now > user.tokenExpiry) return sendResponse(res, 400, "Verification token has expired.");

    user.isVerified = true;
    user.verificationToken = null;
    user.tokenExpiry = null;
    await user.save();

    return sendResponse(res, 200, "Email verified successfully.");
}


// Login
const login = async (req, res) => {
    const { email, password } = req.body;
    const rules = {
        email: "required|string|email|exist:users,email",
        password: "required|string|min:3",
    }

    let { status, message } = await validate({ email, password }, rules);
    if (!status) return sendResponse(res, 400, message);

    // user exists and verified
    const user = await users.findOne({ where: { email, isVerified: true } });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return sendResponse(res, 400, "Invalid email or password.");

    // creating session
    const session_id = uuidv4();

    const token = jwt.sign({ id: user.id, email, name: user.name, session_id }, SECRET_KEY, { expiresIn: "1d" });
    sessions.create({
        session_id,
        user_id: user.id,
        ip: req.ip || req.socket.remoteAddress,
        userAgent: req.headers['user-agent'] || "",
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
    });

    const userDetails = {
        token,
        id: user.id,
        name: user.name,
        email: user.email,
    }
    return sendResponse(res, 200, "Login successful.", userDetails);
}


// Verify token controller when token available in localstorage to get user details
const verifyToken = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return sendResponse(res, 401, 'Unauthorized');

    jwt.verify(token, SECRET_KEY, async (err, decoded) => {
        if (err) return sendResponse(res, 401, 'Unauthorized');

        // check if the session exists
        const session = await sessions.findOne({ where: { session_id: decoded.session_id } })
        if (!session || session.expiresAt < new Date()) return sendResponse(res, 401, 'Session expired.');

        return sendResponse(res, 200, "Token verified successfully.", decoded);
    });
}




module.exports = { registerUser, login, verifyEmail, verifyToken }
// middleware/recaptcha.js
const axios = require('axios');

const verifyRecaptcha = async (req, res, next) => {
  const { recaptchaToken } = req.body;

  if (!recaptchaToken) {
    return res.status(400).json({ error: 'reCAPTCHA token is required', message : "reCAPTCHA token is required" });
  }

  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`
    );

    const { success, score } = response.data;

    if (!success || score < 0.5) {
      return res.status(400).json({ error: 'reCAPTCHA verification failed', message : "reCAPTCHA verification failed" });
    }

    console.log("Captcha verified successfully.")
    next(); 
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return res.status(500).json({ error: 'reCAPTCHA verification failed', message : "reCAPTCHA verification failed" });
  }
};

module.exports = verifyRecaptcha;



const registerTemplate = `<body style=font-family:Arial,sans-serif;margin:0;padding:0;background-color:#f4f4f4;color:#333><div style="max-width:600px;margin:30px auto;padding:20px;background-color:#fff;border-radius:8px;box-shadow:0 4px 8px rgba(0,0,0,.1)"><h1 style=color:#4caf50;font-size:24px>Email Verification</h1><p style=font-size:16px;line-height:1.5>Hello {{name}},<p style=font-size:16px;line-height:1.5>Thank you for registering with us! Please verify your email address by clicking the link below:<p><a href={{url}} style="background-color:#4caf50;color:#fff;padding:15px 25px;text-align:center;text-decoration:none;border-radius:5px;display:inline-block;font-size:16px">Verify My Email</a><p style=font-size:16px;line-height:1.5>If you did not sign up for this account, please ignore this email.<div style=font-size:14px;color:#888;margin-top:20px;text-align:center><p>© 2024 Collab</div></div>`;


module.exports = {registerTemplate}
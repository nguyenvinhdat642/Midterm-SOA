const express = require('express');
const User = require('../service/User');
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2Client = google.auth.OAuth2;
const router = express.Router();

const GOOGLE_MAILER_CLIENT_ID = '1088305001628-4bb04pdrhui0egq95ib53tshp4j4u18t.apps.googleusercontent.com';
const GOOGLE_MAILER_CLIENT_SECRET = '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';
const GOOGLE_MAILER_REFRESH_TOKEN = '1//04NeYBAwhbUGiCgYIARAAGAQSNwF-L9Irjc6RCsK_DCeLjsVBsEq3Xtmv-RtkT10e8HzNw-rAYrQKLqCzQUORUrj7_Is8h_7YsQU';
const ADMIN_EMAIL_ADDRESS = 'vinhdatgg09@gmail.com';

const myOAuth2Client = new OAuth2Client(GOOGLE_MAILER_CLIENT_ID, GOOGLE_MAILER_CLIENT_SECRET);
myOAuth2Client.setCredentials({
    refresh_token: GOOGLE_MAILER_REFRESH_TOKEN
});

const transporter = nodemailer.createTransport({ 
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: ADMIN_EMAIL_ADDRESS,
        clientId: GOOGLE_MAILER_CLIENT_ID,
        clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
        refreshToken: GOOGLE_MAILER_REFRESH_TOKEN,
        accessToken: myOAuth2Client.getAccessToken()
    }
});

const checkLoginMiddleware = (req, res, next) => {
    if (req.session && req.session.user) {
        res.locals.user = req.session.user;
    } else {
        res.locals.user = null;
    }
    next();
};


router.use(checkLoginMiddleware);

router.get('/check-login', (req, res) => {
    if (res.locals.user) {
        res.json({ loggedIn: true, userEmail: res.locals.user.email });
    } else {
        res.json({ loggedIn: false });
    }
}); 

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({ success: true });
});

router.post('/login', async (req, res) => {
    // Redirect to home if the user is already logged in
    if (req.session.user) {
        return res.redirect('/');
    }

    const { email, password } = req.body;

    try {
        const user = await User.findByEmail(email);

        if (user && await bcrypt.compare(password, user.password)) {
            req.session.user = user;
            req.flash('success', 'Đăng nhập thành công!');
            res.redirect('/');
        } else {
            req.flash('error', 'Email hoặc mật khẩu không đúng!');
            res.redirect('/login');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi server');
    }
});


router.post('/register', async (req, res) => {
    if (req.session.user) {
        return res.redirect('/');
    }

    console.log('Đã nhận yêu cầu POST đăng ký:', req.body);
    const { email, password, confirm_password } = req.body; 

    try {
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            req.flash('error', 'Email đã được đăng ký!');
            return res.redirect('/register');
        }

        const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
        req.session.otp = otp;
        req.session.registerPassword = password;

        await sendOtpToEmail(email, otp);

        res.render('confirm-otp', { email });
    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi server');
    }
});

router.post('/confirm-otp', (req, res) => {
    const { email, otp } = req.body;
    console.log('Đã nhận yêu cầu POST xác nhận OTP:', req.body);
    const password = req.session.registerPassword;
    console.log('Mật khẩu đã lưu trong session:', password)

    if (otp === req.session.otp) {
        if (!password) {
            console.error('Password is undefined');
            res.status(400).send('Bad Request: Missing password');
            return;
        } else {
            try {
                User.create({ email, password });
                req.flash('success', 'Đăng ký thành công!');
                console.log('Đăng ký thành công!');
                res.redirect('/login');
            } catch (err) {
                console.error(err);
                res.status(500).send('Lỗi server khi lưu thông tin người dùng vào database');
            }
        }
    } else {
        req.flash('error', 'OTP không đúng!');
        res.redirect('/register');
    }
});

async function sendOtpToEmail(email, otp) {
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Xác nhận OTP',
        text: `Mã OTP của bạn là: ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    console.log('Gửi email với OTP:', email, otp);
}

module.exports = router;

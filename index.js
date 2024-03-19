const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const path = require('path');
const session = require('express-session');
const flash = require('express-flash');
require('dotenv').config();

const indexController = require('./src/controllers/indexController');
const authController = require('./src/controllers/authController');

const app = express();

// Sử dụng middleware session
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// Sử dụng middleware express-flash
app.use(flash());

// Áp dụng middleware của authController
app.use(authController);

app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.use(express.json());

// Kết nối db trong database.js
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ibanking',
});

app.get('/', indexController.getIndex);

app.get('/login', (req, res) => {
    res.render('login', { title: 'Login', message: req.flash('error') });
});

app.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}/`);
});

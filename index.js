const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const path = require('path');
const session = require('express-session');
const flash = require('express-flash');
require('dotenv').config();
const router = express.Router();
const indexController = require('./controllers/indexController');

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.use(express.json());


app.get('/', indexController.getIndex);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
}
);
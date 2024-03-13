const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ibanking',
});

connection.connect((err) => {
    if (err) {
        console.error('Không thể kết nối đến MySQL:', err);
    } else {
        console.log('Kết nối đến MySQL thành công!');
    }
});

module.exports = connection;
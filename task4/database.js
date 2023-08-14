const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mydatabase'
});

connection.connect();

const readTableQuery = `
    select * from users;
`;

connection.query(readTableQuery, (err, res) => {
    console.log(res);
    connection.end();
});

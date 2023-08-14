const express = require('express');
const app = express();
const port = 3000;

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mydatabase'
});

connection.connect();


// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

app.get('/', (req, res) => {
  connection.query("select * from users", (err, result) => {
    res.send(result); 
    // connection.end();
  });
})

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
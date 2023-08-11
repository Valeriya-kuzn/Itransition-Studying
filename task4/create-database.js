const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'usersdb'
});

// Подключение к базе данных
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err.stack);
        return;
    }
    console.log('Connected to database as id', connection.threadId);

    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            last_login_date TIMESTAMP,
            status ENUM('active', 'inactive') DEFAULT 'active'
        );
    `;

    connection.query(createTableQuery, (err) => {
        if (err) {
            console.error('Error creating table:', err.stack);
            return;
        }
        console.log('Table "users" created.');

        // Закрытие соединения с базой данных
        connection.end((err) => {
            if (err) {
                console.error('Error closing connection:', err.stack);
                return;
            }
            console.log('Connection closed.');
        });
    });
});
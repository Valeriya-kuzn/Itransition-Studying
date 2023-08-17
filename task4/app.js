const bodyParser = require('body-parser');
const session = require('express-session');
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'client')));

app.use(session({
  secret: 'session',
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.set('client', path.join(__dirname, 'client'));

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'login.html'));
});

app.get('/registration', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'registration.html'));
});

app.post('/registration', (req, res) => {
  const { name, email, password } = req.body; 
  console.log("Received data:", name, email, password);
  
  if (name && email && password) {
      connection.query(
          'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
          [name, email, password],
          (err, results) => {
              if (err) {
                console.log('Error. Try again.');
                res.redirect('/registration');
              } else {
                  console.log('Registration successfully finished.');
                  res.redirect('/login');
              }
          }
      );
  } else {
      console.log('Please, enter all data');
      res.redirect('/registration');
  }
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  connection.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Ошибка при выполнении запроса');
      } else {
        if (results.length === 0) {
          res.status(401).send('Пользователь с таким логином не найден');
        } else {
          const user = results[0];
          if (user.password === password) {
            connection.query(
              'UPDATE users SET last_login_date = NOW() WHERE id = ?',
              [user.id]
            );
            req.session.user = user;
            res.redirect('/main');
          } else {
            res.status(401).send('Неверный пароль');
          }
        }
      }
    }
  );
});

app.get('/main', (req, res) => {
  if (req.session.user) {
    connection.query('SELECT * FROM users', (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Ошибка при выполнении запроса');
      } else {
        res.render('main', { users: results });
      }
    });
  } else {
    res.redirect('/login');
  }
});


app.get('/logout', (req, res) => {
  req.session.user = null;
  res.redirect('/login');
});

app.post('/update-status', (req, res) => {
  const { action, userIds } = req.body;
  const validActions = ['inactive', 'active'];

  if (validActions.includes(action) && Array.isArray(userIds) && userIds.length > 0) {
      const status = action === 'inactive' ? 'inactive' : 'active';

      connection.query(
          'UPDATE users SET status = ? WHERE id IN (?)',
          [status, userIds],
          (err, results) => {
              if (err) {
                  console.error(err);
                  res.status(500).json({ success: false, error: 'Ошибка при выполнении запроса' });
              } else {
                  res.json({ success: true });
              }
          }
      );
  } else {
      res.status(400).json({ success: false, error: 'Неверные данные запроса' });
  }
});

app.post('/delete-users', (req, res) => {
  const { userIds } = req.body;

  if (Array.isArray(userIds) && userIds.length > 0) {
      connection.query(
          'DELETE FROM users WHERE id IN (?)',
          [userIds],
          (err, results) => {
              if (err) {
                  console.error(err);
                  res.status(500).json({ success: false, error: 'Ошибка при выполнении запроса' });
              } else {
                  res.json({ success: true });
              }
          }
      );
  } else {
      res.status(400).json({ success: false, error: 'Неверные данные запроса' });
  }
});


const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mydatabase'
});

connection.connect();

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});


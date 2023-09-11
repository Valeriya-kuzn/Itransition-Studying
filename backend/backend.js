const express = require('express');
const multer = require('multer');
const cors = require('cors');
const session = require('express-session');
const mysql = require('mysql');
const path = require('path');
const app = express();
const port = 3001;

const serverPath = 'http://localhost:3001/';

app.use(session({
    secret: 'session',
    resave: false,
    saveUninitialized: true
}));

app.use(cors());

app.use(express.static('public'));

app.use(express.json());

const storage = multer.diskStorage({
    destination: 'public/uploads', 
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'projectdb'
});

connection.connect();

app.post('/backend/newpost', upload.single('file'), (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    let photo_path;

    if (req.body.photo_path) {
    photo_path = serverPath + req.file.path.replace(/\\/g, '/').slice(7);
    }

    if (title && content) {
        connection.query(
            'INSERT INTO posts (post_title, post_content, photo_path) VALUES (?, ?, ?)',
            [title, content, photo_path],
            (err, results) => {
                if (err) {
                    res.status(500).send('Error creating new post');
                } else {
                    res.status(201).send('New post successfully created');
                }
            }
        );
    } else {
        res.status(400).send('Please enter all data');
    }
});

app.post('/backend/registration', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password; 
    console.log("Received data:", name, email, password);
    
    if (name && email && password) {
        connection.query(
            'INSERT INTO users (user_name, user_email, password) VALUES (?, ?, ?)',
            [name, email, password],
            (err, results) => {
                if (err) {
                    res.status(500).send('Error request');
                } else {
                    console.log('Registration successfully finished.');
                }
            }
        );
    } else {
        res.status(401).send('Enter all data');
    }
});

app.post('/backend/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    connection.query(
      'SELECT * FROM users WHERE user_email = ?',
      [email],
      (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error request');
        } else {
          if (results.length === 0) {
            res.status(401).send('User is not found');
          } else {
            const user = results[0];
            if (user.password === password) {
              connection.query(
                'UPDATE users SET last_login_date = NOW() WHERE user_id = ?',
                [user.user_id]
              );
                req.session.user = user;
            } else {
              res.status(401).send('Incorrect password');
            }
          }
        }
      }
    );
 });

app.get('/backend/posts', (req, res) => {
    connection.query(
        'SELECT * FROM posts', 
        (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error request');
        } else {
          res.json(results);
        }
      });
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
  });
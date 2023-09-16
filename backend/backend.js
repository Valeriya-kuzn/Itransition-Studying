const express = require('express');
const multer = require('multer');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
const port = 3001;

const serverPath = 'http://localhost:3001/';

app.use(cookieParser());
app.use(session({
    secret: 'session',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['POST', 'GET'],
    credentials: true
}));

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
    const type = req.body.type;
    const creation = req.body.creation;
    const content = req.body.content;
    let photo_path;

    if (req.file) {
    photo_path = serverPath + req.file.path.replace(/\\/g, '/').slice(7);
    }

    if (title && type && creation && content) {
        connection.query(
            'INSERT INTO posts (post_title, post_type, post_creation, post_content, photo_path) VALUES (?, ?, ?, ?, ?)',
            [title, type, creation, content, photo_path],
            (err, results) => {
                if (err) {
                    res.status(500).send('Error creating new post');
                } else {
                    res.json({success: true, status: 'New post successfully created'});
                }
            }
        );
    } else {
        res.json({success: false, status: 'Please enter all data. Check all fields and try again.'});
    }
});

app.post('/backend/registration', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    
    if (name && email && password) {
        connection.query(
            'INSERT INTO users (user_name, user_email, password) VALUES (?, ?, ?)',
            [name, email, password],
            (err, results) => {
                if (err) {
                    res.status(500).send('Error request');
                } else {
                    res.json({success : true});
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
                        res.json({success : true});
                    } else {
                        res.status(401).send('Incorrect password');
                    }
                }
            }
        }
    );
 });

 app.post('/backend/logout', (req, res) => {
    if (req.session.user) {
        req.session.user = null;
        res.json({success : true});
    } else {
        res.status(401).send('You are not authorize');
    }
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

app.get('/backend/access', (req, res) => {
    if (req.session.user) {
        res.json(req.session.user);
    } else {
        res.status(401).send('Unauthorized');
    }
});


app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
  });
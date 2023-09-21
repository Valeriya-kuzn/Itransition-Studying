const express = require('express');
const multer = require('multer');
const cors = require('cors');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const cookieParser = require('cookie-parser');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const port = 80;
const serverPath = 'https://course-project-e5ui.onrender.com/';

const sessionStore = new MySQLStore({
    host: 'sql.freedb.tech',
    port: 3306,
    user: 'freedb_useruser',
    password: '38r!r2K8ApCwGT&',
    database: 'freedb_useruser',
    clearExpired: true,
    checkExpirationInterval: 900000,
    expiration: 86400000
});

app.use(cookieParser());

app.use(session({
    secret: 'session',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    },
    store: sessionStore
}));

app.use(cors({
    origin: 'https://itransition-studying.vercel.app',
    methods: ['OPTIONS','POST', 'GET', 'DELETE'],
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

app.post('/backend/newpost', upload.single('file'), (req, res) => {
    const title = req.body.title;
    const type = req.body.type;
    const creation = req.body.creation;
    const content = req.body.content;
    let photo_path;

    if (req.file) {
    photo_path = serverPath + req.file.path.replace(/\\/g, '/').slice(7);
    }

    console.log(req.session.user)

    if (req.session.user) {
        if (title && type && creation && content) {
            connection.query(
                'INSERT INTO posts (user_id, post_title, post_type, post_creation, post_content, photo_path) VALUES (?, ?, ?, ?, ?, ?)',
                [req.session.user.user_id, title, type, creation, content, photo_path],
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
    } else {
        res.status(401).send('Unauthorized');
    }
});

app.post('/backend/edit-post/:post_id', upload.single('file'), (req, res) => {
    const { post_id } = req.params;
    const title = req.body.title;
    const type = req.body.type;
    const creation = req.body.creation;
    const content = req.body.content;
    let photo_path;

    if (req.file) {
    photo_path = serverPath + req.file.path.replace(/\\/g, '/').slice(7);
    }

    if (title && type && creation && content) {
        if (photo_path) {
            connection.query(
                'UPDATE posts SET post_title = ?, post_type = ?, post_creation = ?, post_content = ?, photo_path = ? WHERE post_id = ?',
                [title, type, creation, content, photo_path, post_id],
                (err, results) => {
                    if (err) {
                        res.json({success: false, status: 'Please enter all data. Check all fields and try again.'});
                    } else {
                        res.json({success: true, status: 'Your post successfully updated'});
                    }
                }
            );
        } else {
            connection.query(
                'UPDATE posts SET post_title = ?, post_type = ?, post_creation = ?, post_content = ? WHERE post_id = ?',
                [title, type, creation, content, post_id],
                (err, results) => {
                    if (err) {
                        res.json({success: false, status: 'Please enter all data. Check all fields and try again.'});
                    } else {
                        res.json({success: true, status: 'Your post successfully updated'});
                    }
                }
            );
        }
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
                        req.session.authenticated = true;
                        req.session.user = user;
                        console.log(req.session.user);
                        res.json({user : user});
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

app.get('/backend/myposts', (req, res) => {
    if (req.session.user) {
        connection.query(
            'SELECT * FROM posts WHERE user_id = ?',
            [req.session.user.user_id],
            (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error request');
            } else {
                res.json(results);
            }
        });
    } else {
        res.status(401).send('You are not authorize');
    }
});

app.get('/backend/view-post/:post_id', (req, res) => {
    const { post_id } = req.params;

    connection.query(
        'SELECT * FROM posts WHERE post_id = ?', 
        [post_id],
        (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error request');
        } else {
          res.json(results[0]);
        }
    });
});

app.delete('/backend/posts/delete', (req, res) => {
    const idDelete = req.body.postIds;
    connection.query(
        'DELETE FROM posts WHERE post_id IN (?)',
        [idDelete],
        (err, results) => {
            if (err) {
                res.status(500).send('Error request');
            } else {
                res.json({success : true});
            }
        }
    )
});

app.get('/backend/access', (req, res) => {
    if (req.session.user) {
        res.json(req.session.user);
    } else {
        res.status(401).send('Unauthorized');
    }
});

const connection = mysql.createConnection({
    port: 3306,
    host: 'sql.freedb.tech',
    user: 'freedb_useruser',
    password: '38r!r2K8ApCwGT&',
    database: 'freedb_IT-studying'
});

connection.connect();

app.listen(port, () => {
    console.log(`Server is listening`);
  });
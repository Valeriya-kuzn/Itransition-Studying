const express = require('express');
const multer = require('multer');
const cors = require('cors');
const mysql = require('mysql');
const path = require('path');
const app = express();

const port = 3001;

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

// const upload = multer();

app.post('/backend/newpost', upload.single('file'), (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    
    if (title && content) {
        connection.query(
            'INSERT INTO posts (post_title, post_content) VALUES (?, ?)',
            [title, content],
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

// app.post('/backend/upload', upload.single('file'), (req, res) => {
//     const filePath = 'public/uploads/' + req.file.filename;
    
//     connection.query(
//         'INSERT INTO posts (photo_path) VALUES (?)',
//         [filePath],
//         (err, results) => {
//             if (err) {
//                 res.status(500).send('Error uploading photo path');
//             } else {
//                 res.status(201).send('Photo successfully uploaded');
//             }
//         }
//     );
    
//     res.send('File uploaded');
// });

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
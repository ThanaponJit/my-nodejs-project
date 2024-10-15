const express = require('express');
const { Pool } = require('pg');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

// การตั้งค่า Multer สําหรับการอัปโหลดไฟล์
const storage = multer.diskStorage({
destination: './public/uploads/',
filename: function (req, file, cb) {
cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
}
});
const upload = multer({ storage: storage });

const app = express();

// เชื่อมต่อฐานข้อมูล PostgreSQL
const pool = new Pool({
user: 'postgres',
host: 'localhost',
database: 'cmsdb',
password: 'rootroot',
port: 5432,
});

// ตั้งค่า EJS เป็น view engine
app.set('view engine', 'ejs');

// เสิร์ฟไฟล์ static เช่นภาพ
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Route: แสดงหน้าแรกพร้อมรายการโพสต์
app.get('/', async (req, res) => {
const result = await pool.query('SELECT * FROM posts');
res.render('index', { posts: result.rows });
});

// Route: แสดงฟอร์มเพิ่มโพสต์ใหม่
app.get('/new-post', (req, res) => {
res.render('new-post');
});

// Route: สร้างโพสต์ใหม่และอัปโหลดภาพ

app.post('/new-post', upload.single('image'), async (req, res) => {
const { title, content } = req.body;
const image = req.file ? req.file.filename : null; //ถ้ามีไฟล์ให้เก็บ path ถ้าไม่มีให้เก็บ null
await pool.query('INSERT INTO posts (title, content, image) VALUES ($1, $2, $3)', [title, content,
image]);
res.redirect('/');
});

// Route: แสดงฟอร์มแก้ไขโพสต์
app.get('/edit-post/:id', async (req, res) => {
const result = await pool.query('SELECT * FROM posts WHERE id = $1', [req.params.id]);
res.render('edit-post', { post: result.rows[0] });
});

// Route: อัปเดตโพสต์
app.post('/edit-post/:id', upload.single('image'), async (req, res) => {
const { title, content } = req.body;
const image = req.file ? req.file.filename : req.body.existingImage;
await pool.query('UPDATE posts SET title = $1, content = $2, image = $3 WHERE id = $4', [title,
content, image, req.params.id]);
res.redirect('/');
});

// Route: ลบโพสต์
app.post('/delete-post/:id', async (req, res) => {
await pool.query('DELETE FROM posts WHERE id = $1', [req.params.id]);
res.redirect('/');
});

// เริ่มเซิร์ฟเวอร์
app.listen(3000, () => {
console.log('Server is running on port 3000');
});
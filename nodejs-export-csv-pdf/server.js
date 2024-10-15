const express = require('express');
const path = require('path');
const { createObjectCsvWriter } = require('csv-writer');
const PDFDocument = require('pdfkit');
const fs = require('fs');

const app = express();
const PORT = 3000;

// ตั้งค่า view engine เป็น EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static('public'));

// ข้อมูลจําลอง
const users = [
{ id: 1, name: 'John Doe', email: 'john@example.com' },
{ id: 2, name: 'Jane Smith', email: 'jane@example.com' },
{ id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
];

// Route แสดงหน้า EJS

app.get('/', (req, res) => {
res.render('index', { users });
});

// Route สําหรับดาวน์โหลด CSV
app.get('/download/csv', (req, res) => {
const csvWriter = createObjectCsvWriter({
path: 'public/files/users.csv',
header: [
{ id: 'id', title: 'ID' },
{ id: 'name', title: 'Name' },
{ id: 'email', title: 'Email' },
],
});

csvWriter
.writeRecords(users)
.then(() => {
console.log('CSV file was written successfully');
res.download(path.join(__dirname, 'public/files/users.csv'));
})
.catch((error) => {
console.error('Error writing CSV file', error);
res.status(500).send('Error writing CSV file');
});
});

// Route สําหรับดาวน์โหลด PDF

app.get('/download/pdf', (req, res) => {
const doc = new PDFDocument();
const filePath = path.join(__dirname, 'public/files/users.pdf');
const writeStream = fs.createWriteStream(filePath);

doc.pipe(writeStream);
doc.fontSize(25).text('Users List', { align: 'center' });
doc.moveDown();

users.forEach((user) => {
doc.fontSize(12).text(`ID: ${user.id}`);
doc.text(`Name: ${user.name}`);
doc.text(`Email: ${user.email}`);
doc.moveDown();
});

doc.end();

writeStream.on('finish', () => {
res.download(filePath);
});

writeStream.on('error', (error) => {
console.error('Error writing PDF file', error);
res.status(500).send('Error writing PDF file');
});
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});
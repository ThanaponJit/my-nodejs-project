import express from 'express';
const app = express();

// Route ส าหรับรับข้อมูลจาก Query Parameters
app.get('/user', (req, res) => {
const { name, age } = req.query;
res.send(`Received query parameters - Name: ${name}, Age: ${age}`);
});
// Route ส าหรับรับข้อมูลจาก URL Parameters
app.get('/user/:name/:age', (req, res) => {
    const { name, age } = req.params;
    res.send(`Received URL parameters - Name: ${name}, Age: ${age}`);
    });

    app.get('/headers', (req, res) => {
        const clientName = req.headers['client-name']; // เข้าถึง Header ที่ชื่อ client-name
        const clientVersion = req.headers['client-version']; // เข้าถึง Header ที่ชื่อ client-version
        
        res.send(`Received Headers - Client Name: ${clientName}, Client Version: ${clientVersion}`);
        });




// เริ่มต้นเซิร์ฟเวอร์
app.listen(3000, () => {
console.log('Server is running on port 3000');
});
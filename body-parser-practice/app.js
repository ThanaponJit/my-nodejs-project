import express from 'express';
import bodyParser from 'body-parser';
const app = express();

// ใช้body-parser ส าหรับแยกข้อมูล JSON
app.use(bodyParser.json());

app.post('/json', (req, res) => {
console.log(req.body); // แสดงข้อมูลใน console
res.send(`Received JSON Data: ${JSON.stringify(req.body.name)}`);

});

// ใช้body-parser ส าหรับแยกข้อมูล form (x-www-form-urlencoded)
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/form', (req, res) => {
console.log(req.body); // แสดงข้อมูลใน console
res.send(`Received Form Data: ${JSON.stringify(req.body)}`);
});

app.get('/',(req,res)=>{
    res.send(`
        <form method="post" action ="/form">
            <input type="text" name="name">
            <input type="text" name="email">
            <input type="submit" value=submit>
        </from>
    `);

});



// ใช้body-parser ส าหรับแยกข้อมูล raw
app.use(bodyParser.raw({ type: 'text/plain'}));

app.post('/raw', (req, res) => {
console.log(req.body.toString()); // แสดงข้อมูล raw เป็น string ใน console
res.send(`Received Raw Data: ${req.body.toString()}`);
});

app.listen(3000, () => {
console.log('Server is running on port 3000');
});
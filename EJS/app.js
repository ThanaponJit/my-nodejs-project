
const express = require('express')
const path = require ('path')

const app = express();
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    let name ="Thanapon Jitsamran";
    res.render('index.ejs',{tname:name});

});




app.listen(3000, () => {
    console.log('Server is running on port 3000');
    });
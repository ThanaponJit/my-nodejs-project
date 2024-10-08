import express from "express";
 const app = express();

 app.get("/",(req, res)=>{ 
    res.send("<h1>Hello Word!</h1>");

 });
app.get("/contact",(req,res)=>{
res.send("<h1>My contact is Spritezazalnw007</h1>")
});

 app.listen(3000,()=>{
    console.log("Sever running on port 3000.")
 });
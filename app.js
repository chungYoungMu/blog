const express =require('express')
const app =express()

app.set("view engine","ejs")

app.use("/node_modules",express.static("./node_modules"))

app.get("/",(req,res)=>{
    res.render("index",{})
})
app.get("/register",(req,res)=>{
    res.render("user/register",{})
})

app.get("/login",(req,res)=>{
    res.render("user/login",{})
})

app.listen(80,()=>{
    console.log("http://127.0.0.1");
})
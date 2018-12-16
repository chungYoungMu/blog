const express =require('express')
const app =express()
const bodyParser=require('body-parser')
const moment=require('moment')
const mysql=require('mysql')

const conn=mysql.createConnection({
    host:"127.0.0.1",
    database:'blog',
    user:'root',
    password:'root'
})

app.set("view engine","ejs")

app.use("/node_modules",express.static("./node_modules"))
app.use(bodyParser.urlencoded({extended:false}))
app.get("/",(req,res)=>{
    res.render("index",{})
})
app.get("/register",(req,res)=>{
    res.render("user/register",{})
})

app.post("/register",(req,res)=>{
    const body = req.body
   
    if(!body.username||!body.password||!body.nickname) 
    return res.send({msg:"请输入完整信息",status:400})
    const sql1="select count(*) as count from users where username=?"
    conn.query(sql1,body.username,(err,result)=>{
        
        if(err) return res.send({msg:"查询失败",status:501})
        if(result[0].count!==0) return res.send({msg:"用户名已存在",status:502})
        body.ctime=moment().format("YYYY-MM-DD HH-mm-ss")
        const sql2="insert into users set ?"
        conn.query(sql2,body,(err,result)=>{
            console.log(result)
            if(err) return res.send({msg:"注册失败，请重试！",status:503})
            
            if(result.affectedRows!==1) return res.send({msg:"注册失败，请重试",status:504})
            res.send({msg:"注册成功！",status:200})
        })
    })

})
    

app.get("/login",(req,res)=>{
    res.render("user/login",{})
})

app.post("/login",(req,res)=>{
   
    const body=req.body
    const sql3="select * from users where username=? and password=?"
    conn.query(sql3,[body.username,body.password],(err,result)=>{
        if(err) return res.send({msg:"登录失败，请重试",status:504})
        if(result.length!==1) res.send({msg:"登录失败，请重试",status:504})
        res.send({msg:"登录成功",status:200})
    })
})

app.listen(80,()=>{
    console.log("http://127.0.0.1");
})
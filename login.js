const mysql = require("mysql");
const express=require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

const app=express();
app.use("/assets",express.static("assets"));
const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    // database:"nodejs"
    password:''
});
//connection to database
connection.connect(function(error)
{
 if(error) throw error;
 console.log("connected to the database successfully!");
}) 


app.get("/",function(req,res)
{
    res.sendFile(__dirname + "/login.html");
})
app.post("/",encoder,function(req,res){
    var username = req.body.username;
    var password = req.body.password
    connection.query("select * from loginuser where user_name=? and user_pass = ?",[username,password],function(error,results,fields)
    {
     if(results.length > 0)
     {
        res.redirect("/welcome.html");
     }   
     else{
        res.redirect("/");
     }
     res.end();
    })
})
//when login is successful
app.get("/welcome",function(res,req)
{
 res.sendFile(__dirname+"/welcome.html") 
})

//set app port
app.listen(4000);
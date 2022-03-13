const express = require('express')
const app = express()
const mysql = require('mysql')

// Setup MySQL database connection
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'csc2008project'
})

app.get("/api/dataset", (req, res) =>{
    const query = "Select * from strokedataset"
    db.query(query , (err, result)=>{
        res.send(result)
    })
})

// app.get("/api/test",(req,res)=>{
//     const query = "Insert into "
// })

app.listen(3001, ()=>{
    console.log("Running on Port 3001");
});
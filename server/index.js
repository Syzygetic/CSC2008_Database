const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const cors = require('cors')
const app = express()

// Setup MySQL database connection
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'csc2008project'      
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(express.json())

app.get("/api/dataset", (req, res) =>{
    const query = "Select * from strokedataset"
    db.query(query, (err,output) =>{
        res.send(output)
    })
})

// app.get("/api/test",(req,res)=>{
//     const query = "Insert into "
// })

app.listen(3001, ()=>{
    console.log("Running on Port 3001");
});
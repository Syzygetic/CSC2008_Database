const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const cors = require('cors')
const mongoose = require("mongoose");
const app = express()

// Connect to MongoDB Atlas
mongoose.connect(
    `mongodb+srv://root:sMxQb3iUmpwO1SzR@csc2008databasesystems.xz41z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
);

// Check if connection is successful
const mongoDb = mongoose.connection;
mongoDb.on("error", console.error.bind(console, "connection error: "));
mongoDb.once("open", function () {
  console.log("Connected successfully");
});

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
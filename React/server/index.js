const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const mysql = require("mysql");
const MongoClient = require('mongodb').MongoClient

// MongoDB
// Connect to MongoDB
var mongodb
MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser:true},(error,result) =>{
    if(error) throw error
    mongodb = result.db('csc2008project')
    console.log('MongoDB connection successful')
})


// MySQL
// Setup MySQL database connection
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: 'csc2008project',
});

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

// app.get("/", (req, res) => {
//     const sqlInsert = "INSERT INTO stroke_data (id, gender, age, hypertension, heart_disease, ever_married, work_type, residence_type, avg_glucose, bmi, smoking_status, stroke) VALUES (30, 'Male', 77, 0, 0, 'No', 'Private', 'Urban', 108.89, '52.3', 'Unknown', 0);";
//     // //const sqlInsert = "INSERT INTO stroke_data (id, gender, age, hypertension, heart_disease) VALUES (16, 'Male', 100, 1, 0);";
//     db.query(sqlInsert, (err, result) => {
//         console.log(err)
//         res.send("Jun Xian Testing 123");
//     }); 
// });

app.post('/register', (req, res)=> {

    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "INSERT INTO userLogin (userEmail, userPassword) VALUES (?,?)", 
        [username, password], 
        (err, result) => {
            console.log(err);
        }
    );
});

app.post('/login', (req, res)=> {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM userLogin WHERE userEmail = ? AND userPassword = ?",
        [username, password],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }

            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ message: "Wrong email/password combination!"});
            }
        }
    );
});

app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM strokedataset;";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

app.get('/api/mongoget',(req,res) =>{
    mongodb.collection('StrokeDataset').find({}).toArray((err,result) =>{
        if(err) throw err
        res.send(result)
    })
})

app.get('/api/stats', (req,res) =>{
    const gender = req.body.gender;
    // const age = req.body.age;
    const hypertension = req.body.hypertension;
    const heart_disease = req.body.heart_disease;
    const ever_married = req.body.ever_married;
    const work_type = req.body.work_type;
    const residence_type = req.body.residence_type;
    // const avg_glucose = req.body.avg_glucose;
    // const bmi = req.body.bmi;
    const smoking_status = req.body.smoking_status;

    const sqlSelect = "SELECT (((SELECT COUNT(*) FROM csc2008project.strokedataset WHERE stroke = 1 AND @gender := gender)/(SELECT COUNT(*) FROM csc2008project.strokedataset WHERE stroke = 1)) * 100) AS matched_gender_percent, (((SELECT COUNT(*) FROM csc2008project.strokedataset WHERE stroke = 1 AND @hypertension := hypertension)/(SELECT COUNT(*) FROM csc2008project.strokedataset WHERE stroke = 1)) * 100) AS matched_hyper_percent, (((SELECT COUNT(*) FROM csc2008project.strokedataset WHERE stroke = 1 AND @heart_disease := heart_disease)/(SELECT COUNT(*) FROM csc2008project.strokedataset WHERE stroke = 1)) * 100) AS matched_heart_percent, (((SELECT COUNT(*) FROM csc2008project.strokedataset WHERE stroke = 1 AND @ever_married := ever_married)/(SELECT COUNT(*) FROM csc2008project.strokedataset WHERE stroke = 1)) * 100) AS matched_married_percent, (((SELECT COUNT(*) FROM csc2008project.strokedataset WHERE stroke = 1 AND @work_type := work_type)/(SELECT COUNT(*) FROM csc2008project.strokedataset WHERE stroke = 1)) * 100) AS matched_work_percent, (((SELECT COUNT(*) FROM csc2008project.strokedataset WHERE stroke = 1 AND @residence_type := residence_type)/(SELECT COUNT(*) FROM csc2008project.strokedataset WHERE stroke = 1)) * 100) AS matched_residence_percent, (((SELECT COUNT(*) FROM csc2008project.strokedataset WHERE stroke = 1 AND @smoking_status := smoking_status)/(SELECT COUNT(*) FROM csc2008project.strokedataset WHERE stroke = 1)) * 100) AS matched_smoking_percent;";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
    // const sqlSelect = "SELECT (((SELECT COUNT(*) FROM csc2008project.strokedataset WHERE stroke = 1 AND @gender := gender)/(SELECT COUNT(*) FROM csc2008project.strokedataset WHERE stroke = 1)) * 100) AS matched_gender_percent, (((SELECT COUNT(*) FROM csc2008project.strokedataset WHERE stroke = 1 AND @age := age)/(SELECT COUNT(*) FROM csc2008project.strokedataset WHERE stroke = 1)) * 100) AS matched_age_percent, (((SELECT COUNT(*) FROM csc2008project.strokedataset WHERE stroke = 1 AND @hypertension := hypertension)/(SELECT COUNT(*) FROM csc2008project.strokedataset WHERE stroke = 1)) * 100) AS matched_hyper_percent, (((SELECT COUNT(*) FROM csc2008project.strokedataset WHERE stroke = 1 AND @heart_disease := heart_disease)/(SELECT COUNT(*) FROM csc2008project.strokedataset WHERE stroke = 1)) * 100) AS matched_heart_percent, (((SELECT COUNT(*) FROM csc2008project.strokedataset WHERE stroke = 1 AND @ever_married := ever_married)/(SELECT COUNT(*) FROM csc2008project.strokedataset WHERE stroke = 1)) * 100) AS matched_married_percent, (((SELECT COUNT(*) FROM csc2008project.strokedataset WHERE stroke = 1 AND @work_type := work_type)/(SELECT COUNT(*) FROM csc2008project.strokedataset WHERE stroke = 1)) * 100) AS matched_work_percent, (((SELECT COUNT(*) FROM csc2008project.strokedataset WHERE stroke = 1 AND @residence_type := residence_type)/(SELECT COUNT(*) FROM csc2008project.strokedataset WHERE stroke = 1)) * 100) AS matched_residence_percent, (((SELECT COUNT(*) FROM csc2008project.strokedataset WHERE stroke = 1 AND @avg_glucose := avg_glucose)/(SELECT COUNT(*) FROM csc2008project.strokedataset WHERE stroke = 1)) * 100) AS matched_glucose_percent, (((SELECT COUNT(*) FROM csc2008project.strokedataset WHERE stroke = 1 AND @bmi := bmi)/(SELECT COUNT(*) FROM csc2008project.strokedataset WHERE stroke = 1)) * 100) AS matched_bmi_percent, (((SELECT COUNT(*) FROM csc2008project.strokedataset WHERE stroke = 1 AND @smoking_status := smoking_status)/(SELECT COUNT(*) FROM csc2008project.strokedataset WHERE stroke = 1)) * 100) AS matched_smoking_percent;";
    // db.query(sqlSelect, (err, result) => {
    // res.send(result);
    // });
});

app.post("/api/insert", (req, res) => {

    const gender = req.body.gender;
    const age = req.body.age;
    const hypertension = req.body.hypertension;
    const heart_disease = req.body.heart_disease;
    const ever_married = req.body.ever_married;
    const work_type = req.body.work_type;
    const residence_type = req.body.residence_type;
    const avg_glucose = req.body.avg_glucose;
    const bmi = req.body.bmi;
    const smoking_status = req.body.smoking_status;

    async function spawnChild() {
        // Spawning a Child Process to run the Machine Learning Python Script
        const { spawn } = require('child_process');
        const child = spawn('python', ["../../Python/MySQLML.py", gender, age, hypertension, heart_disease, ever_married, work_type, residence_type, avg_glucose, bmi, smoking_status]);
    
        let data = "";
        for await (const chunk of child.stdout) {
            console.log('stdout chunk: '+chunk);
            data += chunk;
        }
        let error = "";
        for await (const chunk of child.stderr) {
            console.error('stderr chunk: '+chunk);
            error += chunk;
        }
        const exitCode = await new Promise( (resolve, reject) => {
            child.on('close', resolve);
        });
    
        if( exitCode) {
            throw new Error( `subprocess error exit ${exitCode}, ${error}`);
        }
        return data;
    }
    spawnChild().then(
        data=> {
            data = data.replace('[','')
            data = data.replace(']','')
            data = data.replace(' ','')
            data = data.split(',')
            var stroke = parseInt(data[0])
            console.log(data[0])
            console.log('break')
            const sqlInsert = "INSERT INTO strokedataset (gender, age, hypertension, heart_disease, ever_married, work_type, residence_type, avg_glucose, bmi, smoking_status, stroke) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
            db.query(sqlInsert,[gender, age, hypertension, heart_disease, ever_married, work_type, residence_type, avg_glucose, bmi, smoking_status, stroke], (err, result) => {
                console.log(result);
                res.send(data);
            })
        },
        err=>  {console.error("async error:\n" + err);},
    );
});

app.post("/api/mongoinsert", (req, res) => {

    const gender = req.body.gender;
    const age = req.body.age;
    const hypertension = req.body.hypertension;
    const heart_disease = req.body.heart_disease;
    const ever_married = req.body.ever_married;
    const work_type = req.body.work_type;
    const residence_type = req.body.residence_type;
    const avg_glucose = req.body.avg_glucose;
    const bmi = req.body.bmi;
    const smoking_status = req.body.smoking_status;

    async function spawnMongoChild() {
        // Spawning a Child Process to run the Machine Learning Python Script
        const { spawn } = require('child_process');
        const child = spawn('python', ["../../Python/MongoML.py", gender, age, hypertension, heart_disease, ever_married, work_type, residence_type, avg_glucose, bmi, smoking_status]);
    
        let data = "";
        for await (const chunk of child.stdout) {
            console.log('stdout chunk: '+chunk);
            data += chunk;
        }
        let error = "";
        for await (const chunk of child.stderr) {
            console.error('stderr chunk: '+chunk);
            error += chunk;
        }
        const exitCode = await new Promise( (resolve, reject) => {
            child.on('close', resolve);
        });
    
        if( exitCode) {
            throw new Error( `subprocess error exit ${exitCode}, ${error}`);
        }
        return data;
    }
    spawnMongoChild().then(
        data=>{
            res.send(data)
        }
    )
});

app.listen(3001, () => {
    console.log("running on port 3001");
});


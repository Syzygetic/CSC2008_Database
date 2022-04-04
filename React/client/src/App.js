import { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios'

function App() {

  const [gender, setGender] = useState('')
  const [age, setAge] = useState('')
  const [hypertension, setHypertension] = useState('')
  const [heart_disease, setHeartDisease] = useState('')
  const [ever_married, setEverMarried] = useState('')
  const [work_type, setWorkType] = useState('')
  const [residence_type, setResidenceType] = useState('')
  const [avg_glucose, setAverageGlucose] = useState('')
  const [bmi, setBMI] = useState('')
  const [smoking_status, setSmokingStatus] = useState('')
  const [queryType, setQueryType] = useState('')
  const [inputValid, setInputValid] = useState(false)

  const [strokeDataList, setStrokeDataList] = useState([])
  const [mlStrokeResult, setMLStrokeResult] = useState('')

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setStrokeDataList(response.data)
    })
  }, [])

  const submitCheck = () => {
    setMLStrokeResult("Checking Possibility, Please hold on ...")

    Axios.post("http://localhost:3001/api/insert", {
      gender: gender,
      age: age,
      hypertension: hypertension,
      heart_disease: heart_disease,
      ever_married: ever_married,
      work_type: work_type,
      residence_type: residence_type,
      avg_glucose: avg_glucose,
      bmi: bmi,
      smoking_status: smoking_status
    }).then((response) => {
      console.log(response)
      if (response.data == 0) {
        setMLStrokeResult("Low Chance of Stroke")
      }
      else if (response.data == 1) {
        setMLStrokeResult("Possible Chance of Stroke")
      }
    });
  };

  const beginQuery = () =>{
    checkInputValid()
    if(inputValid){
      if(queryType === '1'){
        submitCheck()
        return
      }

      if(queryType === '0'){
        console.log("Perform Mongo Query")
        return
      }

      return
    }
    setMLStrokeResult('Invalid Inputs, Please check again')
  };

  const checkInputValid = () =>{
    if(gender === ''){
      setInputValid(false)
      return
    }

    if(age === ''){
      setInputValid(false)
      return
    }

    if(hypertension === ''){
      setInputValid(false)
      return
    }

    if(heart_disease === ''){
      setInputValid(false)
      return
    }

    if(ever_married === ''){
      setInputValid(false)
      return
    }

    if(work_type === ''){
      setInputValid(false)
      return
    }

    if(residence_type === ''){
      setInputValid(false)
      return
    }

    if(avg_glucose === ''){
      setInputValid(false)
      return
    }

    if(bmi === ''){
      setInputValid(false)
      return
    }

    if(smoking_status === ''){
      setInputValid(false)
      return
    }

    setInputValid(true)
    return
  }

  return (
    <div className="App">
      <h1>
        Check Possibility of Stroke
      </h1>
      <div className='form'>
        <label>Gender:</label>
        <div className='genderRadio'>
          <input
            type="radio"
            value="1"
            name="gender"
            onChange={(e) => {
              setGender(e.target.value);
            }}
          /> Male
          <input
            type="radio"
            value="0"
            name="gender"
            onChange={(e) => {
              setGender(e.target.value);
            }}
          /> Female
        </div>
        
        <label>Age:</label>
        <input
          type="int"
          name="age"
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />

        <label>Hypertension:</label>
        <div className='hypertensionRadio'>
          <input
            type="radio"
            value="1"
            name="hypertension"
            onChange={(e) => {
              setHypertension(e.target.value);
            }}
          /> Yes
          <input
            type="radio"
            value="0"
            name="hypertension"
            onChange={(e) => {
              setHypertension(e.target.value);
            }}
          /> No
        </div>

        <label>Heart Disease:</label>
        <div className='heartDiseaseRadio'>
          <input
            type="radio"
            value="1"
            name="heart_disease"
            onChange={(e) => {
              setHeartDisease(e.target.value);
            }}
          /> Yes
          <input
            type="radio"
            value="0"
            name="heart_disease"
            onChange={(e) => {
              setHeartDisease(e.target.value);
            }}
          /> No
        </div>

        <label>Ever Married:</label>
        <div className='everMarriedRadio'>
          <input
            type="radio"
            value="1"
            name="ever_married"
            onChange={(e) => {
              setEverMarried(e.target.value);
            }}
          /> Yes
          <input
            type="radio"
            value="0"
            name="ever_married"
            onChange={(e) => {
              setEverMarried(e.target.value);
            }}
          /> No
        </div>

        <label>Work Type:</label>
        <div className='workTypeRadio'>
          <input
            type="radio"
            value="1"
            name="work_type"
            onChange={(e) => {
              setWorkType(e.target.value);
            }}
          /> Children
          <input
            type="radio"
            value="0"
            name="work_type"
            onChange={(e) => {
              setWorkType(e.target.value);
            }}
          /> Never Worked
          <input
            type="radio"
            value="3"
            name="work_type"
            onChange={(e) => {
              setWorkType(e.target.value);
            }}
          /> Self-employed
          <input
            type="radio"
            value="4"
            name="work_type"
            onChange={(e) => {
              setWorkType(e.target.value);
            }}
          /> Private
          <input
            type="radio"
            value="2"
            name="work_type"
            onChange={(e) => {
              setWorkType(e.target.value);
            }}
          /> Government
        </div>

        <label>Residence Type:</label>
        <div className='residenceTypeRadio'>
          <input
            type="radio"
            value="1"
            name="residence_type"
            onChange={(e) => {
              setResidenceType(e.target.value);
            }}
          /> Urban
          <input
            type="radio"
            value="0"
            name="residence_type"
            onChange={(e) => {
              setResidenceType(e.target.value);
            }}
          /> Rural
        </div>
                
        <label>Average Glucose Level:</label>
        <input
          type="float"
          name="avg_glucose"
          onChange={(e) => {
            setAverageGlucose(e.target.value);
          }}
        />

        <label>Body Mass Index (BMI):</label>
        <input
          type="float"
          name="bmi"
          onChange={(e) => {
            setBMI(e.target.value);
          }}
        />

        <label>Smoking Status:</label>
        <div className='smokingStatusRadio'>
          <input
            type="radio"
            value="1"
            name="smoking_status"
            onChange={(e) => {
              setSmokingStatus(e.target.value);
            }}
          /> Never Smoked
          <input
            type="radio"
            value="0"
            name="smoking_status"
            onChange={(e) => {
              setSmokingStatus(e.target.value);
            }}
          /> Formerly Smoked
          <input
            type="radio"
            value="2"
            name="smoking_status"
            onChange={(e) => {
              setSmokingStatus(e.target.value);
            }}
          /> Smokes
        </div>

        <label>Select Query Type:</label>
        <div className='queryRadio'>
          <input
            type="radio"
            value="1"
            name="query_type"
            onChange={(e) => {
              setQueryType(e.target.value);
            }}
          /> Releational
          <input
            type="radio"
            value="0"
            name="query_type"
            onChange={(e) => {
              setQueryType(e.target.value);
            }}
          /> Non-relational
        </div>

        <button onClick={beginQuery}>Check</button>

        <h4>
          Check Result: {mlStrokeResult}
        </h4>

        {strokeDataList.map((val) => {
          return (
            <h5>
              ID: {val.record_id} | 
              Gender: {val.gender} | 
              Age: {val.age} | 
              Hypertension: {val.hypertension} | 
              Heart Disease: {val.heart_disease} | 
              Ever Married: {val.ever_married} | 
              Work Type: {val.work_type} | 
              Residence Type: {val.residence_type} | 
              Average Glucose Level: {val.avg_glucose} | 
              BMI: {val.bmi} | 
              Smoking Status: {val.smoking_status} | 
              Stroke: {val.stroke}
            </h5>
          );
        })}
      </div>

    </div>
  );
}

export default App;

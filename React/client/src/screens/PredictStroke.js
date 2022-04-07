import { useState, useEffect } from 'react';
import '../components/PredictStroke/PredictStroke.css';
import Axios from 'axios'

function PredictStroke() {
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

  const [mlStrokeResult, setMLStrokeResult] = useState('')

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
      if (response.data[0] == 0) {
        setMLStrokeResult(`Low Chance of Stroke, time taken: ${response.data[1]}ms`)
      }
      else if (response.data[0] == 1) {
        setMLStrokeResult(`Possible Chance of Stroke, time taken: ${response.data[1]}ms`)
      }
    });
  };

  const submitMongoCheck = () => {
    setMLStrokeResult("Checking Possibility, Please hold on ...")

    Axios.post("http://localhost:3001/api/mongoinsert", {
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
      console.log('break')
      console.log(response.data[0])
      if (response.data[0] == 0) {
        setMLStrokeResult(`Low Chance of Stroke, time taken: ${response.data[1]}ms`)
      }
      else if (response.data[0] == 1) {
        setMLStrokeResult(`Possible Chance of Stroke, time taken: ${response.data[1]}ms`)
      }
    });
  };

  const beginQuery = () =>{
    
    if(checkInputValid()){
      if(queryType === '1'){
        submitCheck()
        return
      }
  
      if(queryType === '0'){
        submitMongoCheck()
        return
      }
    }else{
      setMLStrokeResult('Invalid Inputs, Please check again')
    }
  };

  const checkInputValid = () =>{
    if(gender === ''){
      return false
    }

    if(age === ''){
      return false
    }

    if(hypertension === ''){
      return false
    }

    if(heart_disease === ''){
      return false
    }

    if(ever_married === ''){
      return false
    }

    if(work_type === ''){
      return false
    }

    if(residence_type === ''){
      return false
    }

    if(avg_glucose === ''){
      return false
    }

    if(bmi === ''){
      return false
    }

    if(smoking_status === ''){
      return false
    }

    return true
  }

  return (
    <div className="App">
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
          /> Relational
          <input
            type="radio"
            value="0"
            name="query_type"
            onChange={(e) => {
              setQueryType(e.target.value);
            }}
          /> Non-relational
        </div>

        <button onClick={beginQuery}>Predict</button>

        <h4>
          Predict Result: {mlStrokeResult}
        </h4>

      </div>

    </div>
  );
}

export default PredictStroke;

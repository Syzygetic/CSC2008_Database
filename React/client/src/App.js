import { useState, useEffect } from 'react';
import './App.css';
import NavBar from './components/General/NavBar';
import Home from './screens/Home'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './screens/Login';
import PredictStroke from './screens/PredictStroke';

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
      if (response.data[0] == 0) {
        setMLStrokeResult(`Low Chance of Stroke, time taken: ${response.data[1]}ms`)
      }
      else if (response.data[0] == 1) {
        setMLStrokeResult(`Possible Chance of Stroke, time taken: ${response.data[1]}ms`)
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
    <Router>
      <div className='App'>
        <NavBar />
        <div className='content'>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/predictstroke">
              <PredictStroke />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App;

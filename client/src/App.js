import React, {useState,useEffect} from 'react';
import './App.css';
import Axios from "axios"

function App() {

  const [dataset, SetDataset] = useState([])

  const testAPI = () => {
    Axios.get('http://localhost:3001/api/dataset').then((output)=>{
      SetDataset(output.data)
    })
  }

  return (
    <div className="App">
     <button onClick={testAPI}>test</button>
     {dataset.map((item)=>{
       return <h1>id: {item.id} gender:{item.gender}</h1>
     })}
    </div>
  );
}

export default App;

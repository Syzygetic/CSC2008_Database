import React, { useMemo, useEffect, useState } from "react";
import Table from "../components/Home/Table";
import Axios from 'axios'
import '../components/Home/Home.css';

const Home = () => {
    // const { error, isPending, data: strokedata } = useFetch('http://localhost:3001/api/get')

    const [strokeDataList, setStrokeDataList] = useState([])

    useEffect(() => {
        (async () => {
          const response = await Axios("http://localhost:3001/api/get");
          setStrokeDataList(response.data);
        })();
    }, []);

    const columns = useMemo(
        () => [
          {
            // first group - Public Existing Stroke Prediction Data
            Header: "Public Stroke Prediction Records",
            // First group columns
            columns: [
              {
                Header: "Record ID",
                accessor: "record_id"
              },
              {
                Header: "Gender",
                accessor: "gender"
              },
              {
                Header: "Age",
                accessor: "age"
              },
              {
                Header: "Hypertension",
                accessor: "hypertension"
              },
              {
                Header: "Heart Disease",
                accessor: "heart_disease"
              },
              {
                Header: "Ever Married",
                accessor: "ever_married"
              },
              {
                Header: "Work Type",
                accessor: "work_type"
              },
              {
                Header: "Residence Type",
                accessor: "residence_type"
              },
              {
                Header: "Average Glucose Level",
                accessor: "avg_glucose"
              },
              {
                Header: "BMI",
                accessor: "bmi"
              },
              {
                Header: "Smoking Status",
                accessor: "smoking_status"
              },
              {
                Header: "Stroke",
                accessor: "stroke"
              }
            ]
          }
        ],
        []
    );

    return (
        <div className="home">
            <Table columns={columns} data={strokeDataList} />
        </div>
    );
}

export default Home;
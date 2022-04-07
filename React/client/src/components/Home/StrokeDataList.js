const StrokeDataList = ({ strokedata }) => {
    return (
        <div className="strokedata-list">
            {strokedata.map(val => (
            <div className="strokedata-preview">
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
            </div>
            ))}
        </div>
        );
    }
   
export default StrokeDataList;
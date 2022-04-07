import pandas
from DBConnect import Database

def cleanDataset():
    ##Read data from CSV file
    data = pandas.read_csv("./Dataset/healthcare-dataset-stroke-data.csv")
    data = data.drop(columns=['id'])
    ##Dataset cleaning
    dataFrame = pandas.DataFrame(data)
    ##Clean gender
    dataFrame.loc[dataFrame['gender']=='Female', 'gender'] = 0
    dataFrame.loc[dataFrame['gender']=='Male', 'gender'] = 1
    dataFrame.loc[dataFrame['gender']=='Other', 'gender'] = 99
    ##Clean ever_married
    dataFrame.loc[dataFrame['ever_married']=='No', 'ever_married'] = 0
    dataFrame.loc[dataFrame['ever_married']=='Yes', 'ever_married'] = 1
    ##Clean work_type
    dataFrame.loc[dataFrame['work_type']=='Never_worked', 'work_type'] = 0
    dataFrame.loc[dataFrame['work_type']=='children', 'work_type'] = 1
    dataFrame.loc[dataFrame['work_type']=='Govt_job', 'work_type'] = 2
    dataFrame.loc[dataFrame['work_type']=='Self-employed', 'work_type'] = 3
    dataFrame.loc[dataFrame['work_type']=='Private', 'work_type'] = 4
    ##Clean Residence_type
    dataFrame.loc[dataFrame['Residence_type']=='Rural', 'Residence_type'] = 0
    dataFrame.loc[dataFrame['Residence_type']=='Urban', 'Residence_type'] = 1
    ##Clean BMI
    dataFrame['bmi'] = dataFrame['bmi'].fillna(99)
    ##Clean smoking_status
    dataFrame.loc[dataFrame['smoking_status']=='formerly smoked', 'smoking_status'] = 0
    dataFrame.loc[dataFrame['smoking_status']=='never smoked', 'smoking_status'] = 1
    dataFrame.loc[dataFrame['smoking_status']=='smokes', 'smoking_status'] = 2
    dataFrame.loc[dataFrame['smoking_status']=='Unknown', 'smoking_status'] = 99
    return dataFrame

def saveDataset(filename):
    #Save a cleaned dataset to CSV
    strokeDataset.to_csv("./Dataset/"+ filename)

def csvToDatabase(strokeDataset):
    try:
        ##Drop table if exist
        ifExistQuery = "DROP TABLE IF EXISTS strokedataset"
        dbCursor.execute(ifExistQuery)
        ##Create table
        createTableQuery = "CREATE TABLE strokedataset (record_id int PRIMARY KEY AUTO_INCREMENT, gender Int, age Int, hypertension Int, heart_disease Int, ever_married Int, work_type Int, residence_type Int, avg_glucose Float, bmi Float, smoking_status Int, stroke Int)"
        dbCursor.execute(createTableQuery)
        ##Insert Data
        insertQuery = "INSERT INTO strokedataset (gender, age, hypertension, heart_disease, ever_married, work_type, residence_type, avg_glucose, bmi, smoking_status, stroke) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        for x, row in strokeDataset.iterrows():
            dbCursor.execute(insertQuery, (row['gender'],row['age'],row['hypertension'],row['heart_disease'],row['ever_married'],row['work_type'],row['Residence_type'],row['avg_glucose_level'],row['bmi'],row['smoking_status'],row['stroke']))
        removeBadDataQuery = "DELETE FROM strokedataset WHERE gender=99 OR bmi=99 OR smoking_status=99"
        dbCursor.execute(removeBadDataQuery)
        print("DB insertion successful")
    except:
        print("DB insertion unsuccessful")

def userLoginTable():
    try:
        ifExistQuery = "DROP TABLE IF EXISTS userLogin"
        dbCursor.execute(ifExistQuery)

        createTableQuery = "CREATE TABLE IF NOT EXISTS userLogin (userEmail VARCHAR(255) PRIMARY KEY, userPassword VARCHAR(255))"
        dbCursor.execute(createTableQuery)

        print("DB Table creation successful")
    except:
        print("DB Table failed to create")


if __name__ == "__main__":
    db = Database()
    db.dbConnect()
    dbCursor = db.getCursor()
    userLoginTable()
    strokeDataset = cleanDataset()
    saveDataset('StrokeDataset.csv')
    csvToDatabase(strokeDataset)
    db.dbCommit()
    db.closeConnection()




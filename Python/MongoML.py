from black import out
from pandas import DataFrame
import pymongo
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn import tree
from datetime import datetime
import sys

class MachineLearning:
    def __init__(self,inputData,outputData,testSize):
        self.inputData = inputData
        self.outputData = outputData
        self.testSize = testSize
        self.splitDataset()
        
    def splitDataset(self):
        ##Split Data into Training Set and Testing Set, test_size=0.2 -> 20% of dataset is used as testing sets
        self.splitData = train_test_split(self.inputData,self.outputData,test_size=self.testSize)
    
    def trainModel(self):
        self.model = DecisionTreeClassifier()
        self.model.fit(self.splitData[0], self.splitData[2])

    def predict(self,inputData):
        return self.model.predict(inputData)

    def getAccuracyTestingSet(self):
        predictionTest = self.predict(self.splitData[1])
        return accuracy_score(self.splitData[3], predictionTest)
    
    def exportDecisionTree(self):
        tree.export_graphviz(self.model, out_file='../../Dataset/stroke-prediction.dot',
        feature_names=['gender','age','hypertension','heart_disease','ever_married','work_type','residence_type','avg_glucose','bmi','smoking_status'],
        class_names=['No Stroke','Stroke'],
        label='all',
        rounded=True,
        filled=True)

if __name__ == "__main__":
    # Connect to database to get input/output data for testing and training
    client = pymongo.MongoClient("mongodb://localhost:27017")
    db = client["csc2008project"]
    startTime = datetime.now()
    inputData = db.StrokeDataset.find({}, {'_id':0, 'stroke':0})
    outputData = db.StrokeDataset.find({}, {'_id':0, 'stroke':1})
    inputData = DataFrame(inputData)
    endTime = datetime.now()
    outputData = DataFrame(outputData)
    timeTaken = endTime - startTime

    # Training of ML model
    ml = MachineLearning(inputData,outputData,0.2)
    ml.trainModel()

    # Export Decision Tree in graphical format
    ml.exportDecisionTree()
    
    # Test the accuracy of the ML prediction
    # print(ml.getAccuracyTestingSet())
    
    # Predicting results/output of new input data
    # predictResult = ml.predict([[1,90,1,0,0,2,0,200.00,30.0,0]])
    gender = int(sys.argv[1])
    age = int(sys.argv[2])
    hypertension = int(sys.argv[3])
    heart_disease = int(sys.argv[4])
    ever_married = int(sys.argv[5])
    work_type = int(sys.argv[6])
    residence_type = int(sys.argv[7])
    avg_glucose = float(sys.argv[8])
    bmi = float(sys.argv[9])
    smoking_status = int(sys.argv[10])
    predictResult = ml.predict([[gender, age, hypertension, heart_disease, ever_married, work_type, residence_type, avg_glucose, bmi, smoking_status]])
    
    # Removing Array Brackets to get Stroke Result data
    strokeResult = [int(str(predictResult)[1:-1]), timeTaken.microseconds]
    print(strokeResult)

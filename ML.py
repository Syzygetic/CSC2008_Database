from DBConnect import Database
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn import tree

class MachineLearning:
    def __init__(self,inputData,outputData,testSize):
        self.inputData = inputData
        self.outputData = outputData
        self.testSize = testSize
        self.splitDataset()
        
    def splitDataset(self):
        ##Split Data into Training Set and Testing Set, test_size=0.2 -> 20% of dataset is used as testing sets
        self.splitData =  train_test_split(self.inputData,self.outputData,test_size=self.testSize)
    
    def trainModel(self):
        self.model = DecisionTreeClassifier()
        self.model.fit(self.splitData[0],self.splitData[2])

    def predict(self,inputData):
        return self.model.predict(inputData)

    def getAccuracyTestingSet(self):
        predictionTest = self.predict(self.splitData[1])
        return accuracy_score(self.splitData[3], predictionTest)
    
    def exportDecisionTree(self):
        tree.export_graphviz(self.model, out_file='stroke-prediction.dot',
        feature_names=['gender','age','hypertension','heart_disease','ever_married','work_type','residence_type','avg_glucose','bmi','smoking_status'],
        class_names=['No Stroke','Stroke'],
        label='all',
        rounded=True,
        filled=True)



if __name__ == "__main__":
    db = Database()
    db.dbConnect()
    inputData = db.getDatasetInput()
    outputData = db.getDatasetOutput()
    db.closeConnection()
    ml = MachineLearning(inputData,outputData,0.2)
    ml.trainModel()
    ##Export Decision Tree in graphical format
    ml.exportDecisionTree()
    ##Test the accuracy of the ML prediction
    print(ml.getAccuracyTestingSet())
    print(ml.predict([[1,90,1,0,0,2,0,200.00,30.0,0]]))

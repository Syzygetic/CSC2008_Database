import mysql.connector
class Database:
    def dbConnect(self,host="",user="",passwd="",database=""):
        self.host = "localhost"
        self.user = "root"
        self.passwd = "password"
        self.database = "csc2008project"
        if host:
            self.host = host
        if user:
            self.user = user
        if passwd:
            self.passwd = passwd
        if database:
            self.database = database
        ##Setup mySQL database connection
        try:
            db = mysql.connector.connect(
            host = self.host,
            user = self.user,
            passwd = self.passwd,
            database = self.database
            )
            print("Database connection successful")
            self.db = db
            self.cursor = self.db.cursor()
        except:
            print("Database connection unsuccessful, please try again")

    def getCursor(self):
        return self.cursor

    def dbCommit(self):
        self.db.commit()
        print("Database commit successful")

    def closeConnection(self):
        try:
            self.cursor.close()
            self.db.close()
            print("Database connection closed successfully")
        except:
            print("Error closing database connection")

    def getDatasetInput(self):
        try:
            query = "SELECT gender,age,hypertension,heart_disease,ever_married,work_type,residence_type,avg_glucose,bmi,smoking_status FROM strokedataset"
            self.cursor.execute(query)
            print("Dataset input query successful")
            return self.cursor.fetchall()
        except:
            print("Dataset input query unsuccessful")

    def getDatasetOutput(self):
        try:
            query = "SELECT stroke FROM strokedataset"
            self.cursor.execute(query)
            print("Dataset output query successful")
            return self.cursor.fetchall()
        except:
            print("Dataset input query unsuccessful")
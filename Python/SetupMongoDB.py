from msilib import add_data
import pymongo
import pandas as pd
import json

#Requires Mongo Docker container to be setup
client = pymongo.MongoClient("mongodb://localhost:27017")
df = pd.read_csv("../Dataset/CleanStrokeDataset.csv")
df = df.iloc[: , 1:]
data = df.to_dict(orient="records")
db = client["csc2008project"]
db.StrokeDataset.drop()
db.StrokeDataset.insert_many(data)
from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
collection = client.joke.article
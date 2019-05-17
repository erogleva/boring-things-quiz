import os
from flask import Flask
from flask_restplus import Api
from flask_pymongo import PyMongo


MONGO_URL = os.environ.get('MONGO_URL')
if not MONGO_URL:
    MONGO_URL = "mongodb://localhost:27017/boring-things"

app = Flask(__name__)

app.config['MONGO_URI'] = MONGO_URL
mongo = PyMongo(app)

api = Api(app)

from boring_things_service.resources import items_ns
api.add_namespace(items_ns)
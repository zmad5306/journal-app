from pymongo import MongoClient
from datetime import datetime
from bson.objectid import ObjectId, InvalidId
import os

client = MongoClient(os.getenv('MONGO_URL'))
db = client['journal']

def get_objectId(id):
    try:
        return ObjectId(id)
    except InvalidId:
        return None

def get_collection(user):
    return db['entries.' + user['sub']]

def convert_id(entry):
    if entry:
        entry['_id'] = str(entry['_id'])
    return entry

def create_entry(entry, user):
    entry['createdDate'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    get_collection(user).insert_one(entry)
    return convert_id(entry)

def find_entries(user):
    cursor = get_collection(user).find().sort('createdDate', -1)
    entries = cursor.to_list(length=None)
    return list(map(convert_id, entries))

def find_entry(id, user):
    object_id = get_objectId(id)
    entry = get_collection(user).find_one({"_id": object_id})
    return convert_id(entry)

def save_entry(entry, user):
    object_id = get_objectId(entry['id'])
    filter_criteria = {'_id': object_id}
    update_values = {'$set': {
        'title': entry['title'],
        'body': entry['body'],
    }}
    get_collection(user).update_one(filter_criteria, update_values)
    return find_entry(entry['id'], user)

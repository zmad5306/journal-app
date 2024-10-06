from flask import Flask, request
from google.oauth2 import id_token
from google.auth.transport import requests
from google.auth.exceptions import InvalidValue
from dotenv import load_dotenv
import os
import repo

app = Flask(__name__)

load_dotenv()

def token_invalid():
    return {'error': 'invalid token', 'code': 'INVALID_TOKEN'}, 401

def not_found():
    return {'error': 'entry not found', 'code': 'NOT_FOUND'}, 404

@app.before_request
def check_auth(): 
    if request.path.startswith("/secure"):
        if 'token' in request.cookies:
            token = request.cookies['token']
            try :
                user_info = id_token.verify_oauth2_token(token, requests.Request(), os.getenv('GOOGLE_OAUTH_CLIENT_ID'))
                request.user = user_info
            except InvalidValue:
                return token_invalid()
        else:
            return token_invalid()
        
@app.route("/config")
def config():
    return {"GOOGLE_OAUTH_CLIENT_ID": os.getenv('GOOGLE_OAUTH_CLIENT_ID')}

@app.route("/secure/entry", methods=['PUT'])
def new_entry(): 
    return repo.create_entry(request.get_json(), request.user)

@app.route("/secure/entry", methods=['PATCH'])
def edit_entry():
    return repo.save_entry(request.get_json(), request.user)

@app.route("/secure/entries")
def entries():
    return repo.find_entries(request.user)

@app.route("/secure/entry/<string:id>")
def get_entry(id):
    entry = repo.find_entry(id, request.user)
    if entry:
        return entry
    else:
        return not_found()

if __name__== "__main__":
    app.run(debug=True)
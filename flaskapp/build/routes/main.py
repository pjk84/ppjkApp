import json
import os
from flask.blueprints import Blueprint
from flask import request, Response, jsonify
from flask.helpers import make_response
from flask_jwt_extended import jwt_required

app_routes = Blueprint('app_routes', __name__)
@app_routes.route('/login', methods=['POST'])
def login():
    payload = json.loads(request.data)
    if payload['password'] == os.getenv('PJK_PASSWORD'):
        response = make_response()
        response.set_cookie('access_token', os.getenv('ACCESS_TOKEN'))
        return response
    return jsonify({'message':'incorrect password'}), 401

@app_routes.route('/test', methods=['POST'])
@jwt_required()
def protected():
    payload = json.loads(request.data)
    return jsonify({"status": "ok"})




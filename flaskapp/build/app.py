from flask import Flask
from dotenv import load_dotenv
import os
from routes.main import app_routes
from routes.blog import blog_routes
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from model import db

load_dotenv()
PORT = os.getenv('PORT')

my_app = Flask(__name__)
my_app.config.from_object("config.Config")
db.init_app(my_app)


my_app.register_blueprint(app_routes, url_prefix="/api/flask")
my_app.register_blueprint(blog_routes, url_prefix="/api/flask")
jwt = JWTManager(my_app)
CORS(my_app, origins="*", supports_credentials=True)



if __name__ == '__main__':
    my_app.run(host='0.0.0.0', port=PORT)
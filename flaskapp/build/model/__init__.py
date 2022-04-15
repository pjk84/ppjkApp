
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from config import Config

engine=create_engine(Config.SQLALCHEMY_DATABASE_URI)
Base = declarative_base()

db = SQLAlchemy()
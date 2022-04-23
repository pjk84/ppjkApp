
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from config import Config
from sqlalchemy.orm import sessionmaker
from contextlib import contextmanager
from functools import wraps

db = SQLAlchemy()

engine=create_engine(Config.SQLALCHEMY_DATABASE_URI)
Session = sessionmaker(engine)

@contextmanager
def session_scope():
    session = Session()
    try:
        yield session
        session.commit()
    except:
        session.rollback()
        raise
    finally:
        session.close()


Base = declarative_base()



from ast import Str
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import DateTime, Column, String
import uuid
from model import db  
import datetime

class BlogPost(db.Model):
    __tablename__ = "blog_post"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(db.String, nullable=False)
    body = Column(db.String, nullable=False)
    has_replies = Column(db.Boolean(), default=False, nullable=False)
    parent_id = Column(db.String, default=None, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    def __init__(self, title, body):
        self.body = body
        self.title = title

class Tags(db.Model):
    __tablename__ = "tags"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    

from ast import Str
from enum import unique
from pickletools import stringnl
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import DateTime, Column, ForeignKey, String, Boolean
import uuid
from typing import List
from sqlalchemy.orm import relationship
from model import Base
from dataclasses import dataclass

import datetime


@dataclass
class Tag(Base):
    __tablename__ = "tag"
    id: uuid = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name: str = Column(String, nullable=False)
    post_id: uuid = Column(UUID(as_uuid=True), ForeignKey('blog_post.id', ondelete='CASCADE'))

@dataclass
class BlogPost(Base):
    __tablename__ = "blog_post"
    id: uuid = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title: str = Column(String, nullable=False)
    body: str = Column(String, nullable=False)
    has_replies: bool = Column(Boolean, default=False, nullable=False)
    parent_id: str = Column(String, default=None, nullable=True)
    created_at: datetime = Column(DateTime, default=datetime.datetime.utcnow)
    tags: Tag = relationship("Tag", backref='post', passive_deletes=True)

    def __init__(self, title, body):
        self.body = body
        self.title = title


    




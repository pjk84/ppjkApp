
from dataclasses import asdict, dataclass
import json
from typing import Optional, TypedDict, List
from unicodedata import name
import uuid
from venv import create
from flask.blueprints import Blueprint
from flask import request, Response, jsonify
from flask.helpers import make_response
from flask_jwt_extended import jwt_required
from model.blog import BlogPost, Tag
from model import db, session_scope

blog_routes = Blueprint('blog_routes', __name__)



@blog_routes.route('/blog/message', methods=['PATCH'])
# @jwt_required()
def patch_message():
    with session_scope() as session:
        payload = json.loads(request.data)
        session.query(BlogPost).filter(BlogPost.id == payload['id']).update({"body": payload['body']})
    return jsonify({"message": "message_updated"})
    
@blog_routes.route('/blog/message', methods=['POST'])
# @jwt_required()
def post_message():
    with session_scope() as session:
        payload = json.loads(request.data)
        print(payload)
        post = BlogPost(title=payload['title'], body=payload['body'])
        session.add(post)
        if(payload['tags']):
            session.flush()
            for tag_name in payload['tags']:
                tag_name = tag_name.replace(" ", "_")
                tag = Tag(name=tag_name, post_id=post.id)
                session.add(tag)
    return jsonify({"message": "message_created"})



@blog_routes.route('/blog/messages', methods=['GET'])
def get_messages():
    with session_scope() as session:
        res = []
        for post in session.query(BlogPost).filter(BlogPost.parent_id == None).all():
            res.append(post)
        # sort by date adscending
        def get_created_at(post):
            return post.created_at
        res.sort(key=get_created_at, reverse=True)
        return jsonify(res)

@blog_routes.route('/blog/message/<title>', methods=['GET'])
def get_post_by_title(title):
    with session_scope() as session:
        post: BlogPost = session.query(BlogPost).filter(BlogPost.title == title).first()
        if not post:
            return jsonify({"message": "post not found"}), 404
        
        return jsonify(post)

# @blog_routes.route('/blog/message/<id>/replies', methods=['GET'])
# def get_replies(id):
#     replies = db.session.query(BlogPost).filter(BlogPost.parent_id == id).all()
#     return jsonify([postToDict(reply) for reply in replies])

@blog_routes.route('/blog/message/<post_id>', methods=['DELETE'])
# @jwt_required()
def delete_messages(post_id):
    with session_scope() as session:
        session.query(BlogPost).filter(BlogPost.id == post_id).delete()

    return jsonify('message deleted')

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



@blog_routes.route('/blog/post', methods=['PATCH'])
# @jwt_required()
def patch_message():
    with session_scope() as session:
        payload = json.loads(request.data)
        session.query(BlogPost).filter(BlogPost.id == payload['id']).update({"body": payload['body']})
    return jsonify({"message": "message_updated"})
    
@blog_routes.route('/blog/post', methods=['POST'])
# @jwt_required()
def post_message():
    with session_scope() as session:
        payload = json.loads(request.data)
        title = payload.get("title")
        body = payload.get('body')
        if not title or not body: 
            return jsonify('missing required parameters'), 400
        title = title.strip()
        post = BlogPost(title, body=payload['body'])
        session.add(post)
        if(payload['tags']):
            session.flush()
            for t in payload['tags']:
                session.add(Tag(name=t['name'].replace(" ", "_"), post_id=post.id))
    return jsonify({"message": "message_created"})



@blog_routes.route('/blog/posts', methods=['GET'])
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

@blog_routes.route('/blog/posts/<title>', methods=['GET'])
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

@blog_routes.route('/blog/posts/<post_id>', methods=['DELETE'])
# @jwt_required()
def delete_messages(post_id):
    with session_scope() as session:
        session.query(BlogPost).filter(BlogPost.id == post_id).delete()

    return jsonify('message deleted')
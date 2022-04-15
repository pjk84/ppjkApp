
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
from model import db

blog_routes = Blueprint('blog_routes', __name__)



@blog_routes.route('/blog/message', methods=['PATCH'])
# @jwt_required()
def patch_message():
    payload = json.loads(request.data)
    db.session.query(BlogPost).filter(BlogPost.id == payload['id']).update({"body": payload['body']})
    db.session.commit()
    return jsonify({"message": "message_updated"})
    
@blog_routes.route('/blog/message', methods=['POST'])
# @jwt_required()
def post_message():
    payload = json.loads(request.data)
    post = BlogPost(title=payload['title'], body=payload['body'])
    db.session.add(post)
    if(payload['tags']):
        db.session.flush()
        for tag_name in payload['tags']:
            tag = Tag(name=tag_name, post_id=post.id)
            db.session.add(tag)
    db.session.commit()
    return jsonify({"message": "message_created"})

@blog_routes.route('/blog/messages', methods=['GET'])
def get_messages():
    res = []
    for post in db.session.query(BlogPost).filter(BlogPost.parent_id == None).all():
        res.append(post)
    print('!!!!!', res)
    # sort by date adscending
    def get_created_at(post):
        return post.created_at
    res.sort(key=get_created_at, reverse=True)
    return jsonify(res)

@blog_routes.route('/blog/message/<title>', methods=['GET'])
def get_message_by_title(title):
    post: BlogPost = db.session.query(BlogPost).filter(BlogPost.title == title).first()
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

    db.session.query(BlogPost).filter(BlogPost.id == post_id).delete()
    db.session.commit()
    return jsonify('message deleted')


# @blog_routes.route('/blog/tag', methods=['POST'])
# # @jwt_required()
# def create_tag():
#     payload = json.loads(request.data)
#     post = Tag(name=payload['tagName'])
#     db.session.add(post)
#     db.session.commit()
#     return jsonify({"message": "tag_created"})

@blog_routes.route('/blog/tags', methods=['GET'])
# @jwt_required()
def get_tags():
    all_tags = []
    for tag in db.session.query(Tag).all():
        all_tags.append(tag)
    return jsonify(all_tags)
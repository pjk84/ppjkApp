
import json
from typing import Optional, TypedDict
from flask.blueprints import Blueprint
from flask import request, Response, jsonify
from flask.helpers import make_response
from flask_jwt_extended import jwt_required
from model.blog import BlogPost
from model import db

blog_routes = Blueprint('blog_routes', __name__)

class BlogPostAsDict(TypedDict):
    id: str
    title: str
    body: str
    has_replies: bool
    parent_id: Optional[str]
    created_at: str


def postToDict(post) -> BlogPostAsDict:
    post = post.__dict__
    post.pop('_sa_instance_state', None)
    post['id'] = str(post['id'])
    return post


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
    db.session.commit()
    return jsonify({"message": "message_created"})

@blog_routes.route('/blog/messages', methods=['GET'])
def get_messages():
    res = []
    for row in db.session.query(BlogPost).filter(BlogPost.parent_id == None).all():
        res.append(postToDict(row))
    # sort by date adscending
    def get_created_at(post):
        return post.get('created_at')
    res.sort(key=get_created_at, reverse=True)
    return jsonify(res)

@blog_routes.route('/blog/message/<title>', methods=['GET'])
def get_message_by_title(title):
    post = db.session.query(BlogPost).filter(BlogPost.title == title).first()
    if not post:
        return jsonify({"message": "post not found"}), 404
    return jsonify(postToDict(post))

@blog_routes.route('/blog/message/<id>/replies', methods=['GET'])
def get_replies(id):
    replies = db.session.query(BlogPost).filter(BlogPost.parent_id == id).all()
    return jsonify([postToDict(reply) for reply in replies])

@blog_routes.route('/blog/message/<post_id>', methods=['DELETE'])
# @jwt_required()
def delete_messages(post_id):

    db.session.query(BlogPost).filter(BlogPost.id == post_id).delete()
    db.session.commit()
    return jsonify('message deleted')
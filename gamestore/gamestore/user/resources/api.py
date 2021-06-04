"""Api for Games"""
from flask_apispec import MethodResource, marshal_with, use_kwargs
from flask_restful import Resource, reqparse
from gamestore import db
from gamestore.gamestore.model import User
from .schemas import UserBaseSchema, UserRequestSchema, UserRequestEditSchema


class UserResource(MethodResource, Resource):
    @marshal_with(UserBaseSchema(many=True))
    def get(self):
        try:
            return User.query.all()
        except Exception:
            return {'message': 'Getting exception'}, 500

    @use_kwargs(UserRequestEditSchema)
    def put(self, **kwargs):
        user_id = kwargs['id']
        user = User.query.filter(User.id == user_id).first()
        user.role = kwargs['role']
        try:
            db.session.commit()
            db.session.close()
            return {'message': 'Putted'}, 202
        except Exception:
            return {'message': "Put exception."}, 500

    @use_kwargs(UserRequestSchema)
    def delete(self, **kwargs):
        user_id = int(kwargs['id'])
        try:
            user = User.query.filter(User.id == user_id).first()
            db.session.delete(user)
            db.session.commit()
            return {'message': "User deleted."}, 204
        except Exception:
            return {'message': 'Delete exception'}, 500

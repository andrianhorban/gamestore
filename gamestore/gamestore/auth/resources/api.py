import secrets

from flask import g
from flask_apispec import MethodResource, use_kwargs
from flask_login import login_user, login_required, current_user, logout_user
from flask_restful import Resource
import _sha256
from gamestore import db, bcrypt
from gamestore.gamestore.auth.resources.schemas import UserRequestSchema, UserBaseSchema
from gamestore.gamestore.model import User


class Register(MethodResource, Resource):
    @use_kwargs(UserBaseSchema, location=('json'))
    def post(self, **kwargs):
        user = User.query.filter_by(mail=kwargs['mail']).first()
        if not user:
            try:
                password = bcrypt.generate_password_hash(kwargs['password'], 10)
                decoded = password.decode('utf-8')
                user = User(mail=kwargs['mail'], nick_name=kwargs['nick_name'], name=kwargs['name'],
                            age=kwargs['age'], password=decoded)
                db.session.add(user)
                db.session.commit()
                return {'message': 'Registration complete'}, 200
            except Exception:
                return {'message': 'Registration error'}, 500
        else:
            return {'message': "User already exists. Try to log in."}, 500


class Login(MethodResource, Resource):
    @use_kwargs(UserRequestSchema, location=('json'))
    def post(self, **kwargs):
        token = 'guest'
        try:
            user = User.query.filter_by(mail=kwargs['mail']).first()
            if user:
                if bcrypt.check_password_hash(user.password, kwargs['password']):
                    user.is_authenticated = True
                    login_user(user)
                    token = secrets.token_hex(16)
                    object = {
                        'status': 'OK',
                        'message': "Successfully logged in.",
                        'user': {'nick_name': current_user.nick_name, 'role': current_user.role, 'token': token}
                    }
                    return object, 200
                else:
                    return {'message': "Bad password."}, 500
            else:
                return {'message': "User does not exist."}, 500
        except Exception:
            return {'message': 'Logging error'}, 500


class Logout(MethodResource, Resource):
    def get(self):
        try:
            logout_user()
            return {'message': 'Logout'}, 200
        except Exception:
            return {'message': 'Logout error'}, 500

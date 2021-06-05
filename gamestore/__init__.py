"""main app init"""
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_login import login_manager, LoginManager
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from config import config
from flask_apispec.extension import FlaskApiSpec
from flask import session
from flask_session import Session


db = SQLAlchemy()
migrate = Migrate()
docs = FlaskApiSpec()
bcrypt = Bcrypt()
cors = CORS()
session = Session()
from gamestore.gamestore.model import *

login_manager = LoginManager()


def create_app(config_name):
    """An application factory"""
    app = Flask(__name__)
    app.config.from_object(config[config_name])

    db.init_app(app)
    migrate.init_app(app, db)

    blueprint_registration(app)

    api = Api(app)
    resource_adding(api)

    docs.init_app(app)
    register_docs(docs)

    bcrypt.init_app(app)

    login_manager.init_app(app)

    cors.init_app(app, supports_credentials=True)

    session.init_app(app)



    @login_manager.user_loader
    def user_loader(user_id):
        # since the user_id is just the primary key of our user table, use it in the query for the user
        return User.query.get(int(user_id))

    return app


def blueprint_registration(app):
    pass


def resource_adding(api):

    from gamestore.gamestore.games.resources.api import GameResource
    api.add_resource(GameResource, '/api/game')

    from gamestore.gamestore.auth.resources.api import Register, Login, Logout
    api.add_resource(Register, '/register')
    api.add_resource(Logout, '/logout')
    api.add_resource(Login, '/login')

    from gamestore.gamestore.cart.resources.api import CartResource
    api.add_resource(CartResource, '/api/cart')

    from gamestore.gamestore.image.resources.api import ImageResource
    api.add_resource(ImageResource, '/api/image')

    from gamestore.gamestore.user.resources.api import UserResource
    api.add_resource(UserResource, '/api/user')

def register_docs(docs):
    """Register docs"""
    pass


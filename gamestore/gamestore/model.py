"""model for bd"""
from flask_login import UserMixin

from gamestore import db
from sqlalchemy.orm import validates, relationship


class Game(db.Model):
    id = db.Column(db.INTEGER, primary_key=True)
    title = db.Column(db.Text, unique=True, nullable=False)
    text = db.Column(db.Text, default='Description of the game.')
    is_available = db.Column(db.Boolean, default=False, nullable=False)
    price = db.Column(db.INTEGER)
    quantity = db.Column(db.INTEGER, nullable=True)
    genre = db.Column(db.String(40), default='Other', nullable=False)
    image = db.relationship('Image', backref='game')
    userProductOrders = db.relationship('UserOrdersProducts', backref='game')


class Image(db.Model):
    id = db.Column(db.INTEGER, primary_key=True)
    img = db.Column(db.LargeBinary((2 ** 32) - 1))
    title = db.Column(db.Text, nullable=False)
    game_id = db.Column(db.INTEGER, db.ForeignKey('game.id'))


class User(UserMixin, db.Model):
    id = db.Column(db.INTEGER, primary_key=True)
    nick_name = db.Column(db.String(64), nullable=False, unique=True)
    name = db.Column(db.String(64), nullable=False)
    mail = db.Column(db.String(128), nullable=False, unique=True)
    password = db.Column(db.String(128), nullable=False)
    age = db.Column(db.INTEGER, nullable=False)
    role = db.Column(db.String, default='user', nullable=True)
    is_authenticated = db.Column(db.Boolean, default=False)
    orders = db.relationship('Orders', backref='user')


class Orders(db.Model):
    id = db.Column(db.INTEGER, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),
                        nullable=False)
    order_status = db.Column(db.Boolean, default=False, nullable=False)
    total_order_price = db.Column(db.INTEGER)
    order_comment = db.Column(db.Text(), default='Without comment')
    orders = db.relationship('UserOrdersProducts')


class UserOrdersProducts(db.Model):
    id = db.Column(db.INTEGER, primary_key=True)
    product_id = db.Column(db.INTEGER, db.ForeignKey('game.id'), nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'),
                         nullable=False)
    quantity = db.Column(db.INTEGER)

from flask import session
from flask_apispec import MethodResource, use_kwargs, marshal_with
from flask_restful import Resource
from flask import g

from .schemas import CartRequestSchema, CartBaseSchema

from gamestore import Game

a = []
class CartResource(MethodResource, Resource):

    @marshal_with(CartBaseSchema(many=True))
    def get(self):
        """items in cart"""

        try:

            purchased_products = [Game.query.filter(Game.id == id).first() for id in session['cart']]
            print(purchased_products)
            total_sum = "to be realised"

            if not purchased_products:
                print('if nor')
                return {'message': 'Cart is empty.'}, 200
            else:
                print('dgd')
                return purchased_products

        except Exception:
            return {'message': 'Cart error.'}, 500

    @use_kwargs(CartRequestSchema)
    def post(self, **kwargs):
        """add item to cart"""
        session.permanent = True
        if 'cart' not in session:
            session['cart'] = []
        try:

            session['cart'].append(kwargs['id'])
            a.append(kwargs['id'])
            session.modified = True
            print("ADasd")
            print("ADasd")
            print("ADasd")
            print("ADasd")
            print("ADasd")
            print(session['cart'])
            print("ADasd")
            print("ADasd")
            print("ADasd")
            print("ADasd")
            print("ADasd")
            return {'message': 'Added to cart.'}, 200
        except Exception:
            return {'message': 'Adding to cart error.'}, 500

    @use_kwargs(CartRequestSchema)
    def delete(self, **kwargs):
        """delete item"""
        try:
            print('del')
            print('del')
            print('del')
            item = next(item for item in session['cart'] if item == kwargs['id'])
            print(item)
            print('del')
            print('del')
            print('del')
            print('del')
            session['cart'].remove(item)
            session.modified = True
            return {'message': 'Item deleted from cart'}, 200
        except Exception:
            return {'message': 'Error when deleting from cart.'}, 500

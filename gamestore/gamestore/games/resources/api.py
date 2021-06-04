"""Api for Games"""
from flask_apispec import MethodResource, marshal_with, use_kwargs
from flask_restful import Resource, reqparse
from gamestore import db
from gamestore.gamestore.model import Game, UserOrdersProducts
from .schemas import GameResponseSchema, GameRequestSchema, GameBaseSchema


class GameResource(MethodResource, Resource):
    @marshal_with(GameBaseSchema(many=True))
    def get(self):
        gmes = Game.query.all()
        print(gmes)
        try:

            return Game.query.all()
        except Exception:
            return {'message': 'Getting exception'}, 500

    @use_kwargs(GameResponseSchema)
    def post(self, **kwargs):
        print('POST')
        print(kwargs['title'])
        try:
            item = Game(title=kwargs['title'], text=kwargs['text'], price=int(kwargs['price']),
                        genre=kwargs['genre'], quantity=int(kwargs['quantity']), is_available=True)
            print(item)
            db.session.add(item)
            db.session.commit()
            return {'message': "Posted"}, 201
        except Exception:
            return {'message': 'Post exception'}, 500

    @use_kwargs(GameResponseSchema)
    def put(self, **kwargs):
        item_id = kwargs['id']
        item = Game.query.filter(Game.id == item_id).first()
        item.title = kwargs['title']
        item.text = kwargs['text']
        item.price = int(kwargs['price'])
        item.genre = kwargs['genre']
        item.quantity = int(kwargs['quantity'])
        try:
            db.session.commit()
            db.session.close()
            return {'message': 'Putted'}, 202
        except Exception:
            return {'message': "Put exception."}, 500

    @use_kwargs(GameRequestSchema)
    def delete(self, **kwargs):
        item_id = int(kwargs['id'])
        try:
            item = Game.query.filter(Game.id == item_id).first()
            db.session.delete(item)
            db.session.commit()
            return {'message': "Item deleted."}, 204
        except Exception:
            return {'message': 'Delete exception'}, 500

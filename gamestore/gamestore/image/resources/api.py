import base64

from flask import request
from flask_apispec import MethodResource
from flask_restful import Resource
from werkzeug.utils import secure_filename

from gamestore.gamestore.model import Image, Game
from gamestore import db


class ImageResource(MethodResource, Resource):

    def post(self):
        file = request.files['file']
        if not (file.mimetype == 'image/jpeg'):
            return {'message': 'File type must be JPG'}, 500
        to_base64 = base64.b64encode(file.read())
        w0 = secure_filename(file.filename).replace('_', ' ')
        corrected_filename = w0.replace('.jpg', '')
        print(corrected_filename)
        game = Game.query.filter(Game.title == corrected_filename).first()

        img = Image(img=to_base64, title=corrected_filename, game_id=game.id)
        try:
            db.session.add(img)
            db.session.commit()
            return {'message': 'Image has been created.'}, 202
        except Exception:
            return {'message': 'Updating image error'}, 500

    def put(self):
        file = request.files['file']
        if not (file.mimetype == 'image/jpeg'):
            return {'message': 'File type must be JPG'}, 500
        to_base64 = base64.b64encode(file.read())
        w0 = secure_filename(file.filename).replace('_', ' ')
        corrected_filename = w0.replace('.jpg', '')
        img = Image.query.filter(Image.title == corrected_filename).first()
        img.img = to_base64
        try:
            db.session.commit()
            db.session.close()
            return {'message': 'Image has been updated.'}, 202
        except Exception:
            return {'message': 'Updating image error'}, 500

    def get(self):
        img_to_return = []
        im_list = Image.query.all()
        for i in im_list:
            img_decode = (i.img).decode('utf-8')
            jsonImage = {
                'id': i.id,
                'image': img_decode,
                'title': i.title,
                'game_id': i.game_id
            }
            img_to_return.append(jsonImage)
        return img_to_return

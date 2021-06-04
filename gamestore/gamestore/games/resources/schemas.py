from marshmallow import fields, Schema


class GameBaseSchema(Schema):
    id = fields.Integer()
    title = fields.String()
    text = fields.String()
    price = fields.Integer()
    quantity = fields.Integer()
    is_available = fields.Boolean()
    genre = fields.String()


class GameRequestSchema(Schema):
    id = fields.Integer()


class GameResponseSchema(Schema):
    id = fields.Integer()
    title = fields.String()
    text = fields.String()
    price = fields.Integer()
    quantity = fields.Integer()
    genre = fields.String()
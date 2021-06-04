from marshmallow import fields, Schema


class CartBaseSchema(Schema):
    id = fields.Integer()
    title = fields.String()
    text = fields.String()
    price = fields.Integer()
    quantity = fields.Integer()
    is_available = fields.Boolean()
    genre = fields.String()


class CartRequestSchema(Schema):
    id = fields.Integer()
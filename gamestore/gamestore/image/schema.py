from marshmallow import fields, Schema


class ImageBaseSchema(Schema):
    id = fields.Integer()
    img = fields.String()
    title = fields.String()


class ImageRequestSchema(Schema):
    id = fields.Integer()


class ImageResponseSchema(Schema):
    img = fields.String()
    title = fields.String()

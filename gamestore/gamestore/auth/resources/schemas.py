from marshmallow import fields, Schema


class UserBaseSchema(Schema):
    id = fields.Integer()
    nick_name = fields.String()
    name = fields.String()
    mail = fields.String()
    password = fields.String()
    age = fields.Integer()
    role = fields.String()


class UserRequestSchema(Schema):
    mail = fields.String(required=True)
    password = fields.String(required=True)

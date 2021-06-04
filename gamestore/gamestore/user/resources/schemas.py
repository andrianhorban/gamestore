from marshmallow import fields, Schema


class UserBaseSchema(Schema):
    id = fields.Integer()
    nick_name = fields.String()
    name = fields.String()
    mail = fields.String()
    age = fields.String()
    role = fields.String()


class UserRequestEditSchema(Schema):
    id = fields.Integer()
    role = fields.String()

class UserRequestSchema(Schema):
    id = fields.Integer()

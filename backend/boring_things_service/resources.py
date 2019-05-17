from flask_restplus import Namespace, Resource, fields
from boring_things_service import mongo, api


items_ns = Namespace('items')

item_translated_properties = items_ns.model('Item translated properties', {
    'quizDescription': fields.String(required=True)
})

item_locales =  items_ns.model('Item locales', {
    'en': fields.Nested(item_translated_properties, required=True)
})

item = items_ns.model('Item', {
    'id': fields.String(required=True, description='Item identifier'),
    'name': fields.String(required=True, description='Item name'),
    'quizDescription': fields.String(required=True, description='Short description of the item'),
    'detailedDescription': fields.String(required=True, description='Detailed description of the item'),
    'locales': fields.Nested(item_locales, required=True),
    'likes': fields.Integer,
    'dislikes': fields.Integer
})


@items_ns.route('/')
class ItemsList(Resource):
    @items_ns.doc('list_items')
    @items_ns.marshal_list_with(item)
    def get(self):
        items = mongo.db.items.find()
        return items

    @items_ns.doc('post_item')
    @items_ns.expect(item, validate=True)
    @items_ns.marshal_with(item)
    def post(self):
        items = mongo.db.items
        created_item = self.api.payload
        created_item.update({'likes': 0, 'dislikes': 0})
        item_id = items.insert(created_item)
        new_item = items.find_one({'_id': item_id })
        return new_item


@items_ns.route('/<item_id>')
@items_ns.param('item_id', 'The item identifier')
@items_ns.response(404, 'Item not found')
class Item(Resource):
    @items_ns.doc('get_item')
    @items_ns.marshal_with(item)
    def get(self, item_id):
        item = mongo.db.items.find_one({'id': item_id})
        if item:
            return item
        items_ns.abort(404)

@items_ns.route('/<item_id>/like')
@items_ns.param('item_id', 'The item identifier')
@items_ns.response(404, 'Item not found')
class ItemLikes(Resource):
    @items_ns.doc('like_item')
    @items_ns.marshal_with(item)
    def put(self, item_id):
        mongo.db.items.update_one({'id': item_id}, {'$inc': {'likes': 1}})
        item = mongo.db.items.find_one({'id': item_id})
        return item


@items_ns.route('/<item_id>/dislike')
@items_ns.param('item_id', 'The item identifier')
@items_ns.response(404, 'Item not found')
class ItemLikes(Resource):
    @items_ns.doc('like_item')
    @items_ns.marshal_with(item)
    def put(self, item_id):
        mongo.db.items.update_one({'id': item_id}, {'$inc': {'dislikes': 1}})
        item = mongo.db.items.find_one({'id': item_id})
        return item










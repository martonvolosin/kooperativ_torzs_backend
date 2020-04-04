// POST
exports.addUser = require('./user/addUserSchema');
exports.updateUser = require('./user/updateUserSchema');
exports.addItem = require('./item/addItemSchema');
exports.updateItem = require('./item/updateItemSchema');

// GET
exports.getUser = require('./emptySchema');
exports.getItem = require('./emptySchema');
exports.getOwnItems = require('./emptySchema');
exports.getCategories = require('./emptySchema');

// DELETE
exports.deleteItem = require('./item/deleteItemSchema');
exports.deleteUser = require('./emptySchema');

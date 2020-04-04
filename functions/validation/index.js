// POST
exports.addUser = require('./user/addUserSchema');
exports.updateUser = require('./user/updateUserSchema');
exports.addItem = require('./item/addItemSchema');

// GET
exports.getUser = require('./emptySchema');
exports.getItem = require('./emptySchema');

// DELETE
exports.deletItem = require('./item/deleteItemSchema');
exports.deleteUser = require('./emptySchema');

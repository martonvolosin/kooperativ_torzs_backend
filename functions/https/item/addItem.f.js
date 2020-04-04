const { createItem } = require('../../firestore/ItemHelper');
const { STATUS_CODES } = require('../../utils/constants');

// eslint-disable-next-line
const addItem = async (req, res, next) => {
  const { body } = req;
  body.userId = req.user.id;
  
  try {
    await createItem(body, res);
    res.send({ status: 201, message: STATUS_CODES.STATUS_201 });
  } catch (error) {
    return next(error);
  }
};

exports = module.exports = addItem;
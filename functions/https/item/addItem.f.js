const { createItem } = require('../../firestore/ItemHelper');
const { STATUS_CODES } = require('../../utils/constants');

// eslint-disable-next-line
const addItem = async (req, res, next) => {
  const { body, user: { uid } } = req
  body.userId = uid;
  
  try {
    const itemId = await createItem(body, res);
    res.send({ itemId, status: 201, message: STATUS_CODES.STATUS_201 });
  } catch (error) {
    return next(error);
  }
};

exports = module.exports = addItem;
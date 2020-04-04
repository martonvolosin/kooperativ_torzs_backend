const { removeItem } = require('../../firestore/ItemHelper');
const { STATUS_CODES } = require('../../utils/constants');

// eslint-disable-next-line
const deleteItem = async (req, res, next) => {
  try {
    await removeItem(req.body, res);
    res.send({ status: 200, message: STATUS_CODES.STATUS_200 });
  } catch (error) {
    return next(error);
  }
};

exports = module.exports = deleteItem;
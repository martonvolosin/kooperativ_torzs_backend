const { modifyItem } = require('../../firestore/ItemHelper');
const { STATUS_CODES } = require('../../utils/constants');

// eslint-disable-next-line
const updateItem = async (req, res, next) => {
  try {
    await modifyItem(req.body, res);
    res.send({ status: 204, message: STATUS_CODES.STATUS_204 });
  } catch (error) {
    return next(error);
  }
};

exports = module.exports = updateItem;
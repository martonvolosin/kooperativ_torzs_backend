const { modifyItem } = require('../../firestore/ItemHelper');
const { STATUS_CODES } = require('../../utils/constants');

// eslint-disable-next-line
const updateItem = async (req, res, next) => {
  const { body } = req;
  body.userId = req.user.uid;

  try {
    await modifyItem(body, res);
    res.send({ status: 204, message: STATUS_CODES.STATUS_204 });
  } catch (error) {
    return next(error);
  }
};

exports = module.exports = updateItem;
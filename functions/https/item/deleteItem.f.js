const { removeItem } = require('../../firestore/ItemHelper');
const { STATUS_CODES } = require('../../utils/constants');

// eslint-disable-next-line
const deleteItem = async (req, res, next) => {
  const { body, user: { uid } } = req
  body.userId = uid;

  try {
    await removeItem(body, res);
    res.send({ status: 200, message: STATUS_CODES.STATUS_200 });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

exports = module.exports = deleteItem;
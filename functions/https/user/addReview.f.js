const { createReview } = require('../../firestore/UserHelper');
const { STATUS_CODES } = require('../../utils/constants');

// eslint-disable-next-line
const addReview = async (req, res, next) => {
  const { body, user: { uid } } = req;
  body.userId = uid;

  try {
    await createReview(body, uid);
    res.send({ status: 200, message: STATUS_CODES.STATUS_200 });
  } catch (error) {
    return next(error);
  }
};

exports = module.exports = addReview;
const { createUser } = require('../../firestore/UserHelper');
const { STATUS_CODES } = require('../../utils/constants');

// eslint-disable-next-line
const addUser = async (req, res, next) => {
  try {
    await createUser(req.body, res);
    res.send({ status: 201, message: STATUS_CODES.STATUS_201 });
  } catch (error) {
    return next(error);
  }
};

exports = module.exports = addUser;
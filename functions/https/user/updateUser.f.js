const { modifyUser } = require('../../firestore/UserHelper');
const { STATUS_CODES } = require('../../utils/constants');

// eslint-disable-next-line
const updateUser = async (req, res, next) => {
  try {
    await modifyUser(req.body, res);
    res.send({ status: 204, message: STATUS_CODES.STATUS_204 });
  } catch (error) {
    return next(error);
  }
};

exports = module.exports = updateUser;
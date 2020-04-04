const { removeUser } = require('../../firestore/UserHelper');
const { STATUS_CODES } = require('../../utils/constants');

// eslint-disable-next-line
const deleteUser = async (req, res, next) => {
  try {
    await removeUser(req.params.userId, res);
    res.send({ status: 200, message: STATUS_CODES.STATUS_200 });
  } catch (error) {
    return next(error);
  }
};

deleteUser.method = 'delete';

exports = module.exports = deleteUser;
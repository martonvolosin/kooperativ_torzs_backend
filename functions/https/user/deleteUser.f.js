const { removeUser } = require('../../firestore/UserHelper');
const { STATUS_CODES } = require('../../utils/constants');

// eslint-disable-next-line
const deleteUser = async (req, res, next) => {
  const { user: { uid } } = req;
  try {
    await removeUser(uid);
    res.send({ status: 200, message: STATUS_CODES.STATUS_200 });
  } catch (error) {
    return next(error);
  }
};

deleteUser.method = 'post';

exports = module.exports = deleteUser;
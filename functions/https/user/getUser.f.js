const { fetchUser } = require('../../firestore/UserHelper');

// eslint-disable-next-line
const getUser = async (req, res, next) => {
  try {
    const user = await fetchUser(req.params, res);
    res.send({ status: 200, payload: user });
  } catch (error) {
    return next(error);
  }
};

getUser.method = 'get';

exports = module.exports = getUser;
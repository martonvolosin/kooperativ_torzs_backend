const { fetchUser } = require('../../firestore/UserHelper');
const { fetchItemsByUser } = require('../../firestore/ItemHelper');

// eslint-disable-next-line
const getUser = async (req, res, next) => {
  try {
    const user = await fetchUser(req.params, res);
    const items = await fetchItemsByUser(user);
    res.send({ status: 200, payload: items });
  } catch (error) {
    return next(error);
  }
};

getUser.method = 'get';

exports = module.exports = getUser;

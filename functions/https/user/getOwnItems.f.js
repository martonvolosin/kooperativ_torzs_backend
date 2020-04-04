const { fetchUser } = require('../../firestore/UserHelper');
const { fetchItemsByUser } = require('../../firestore/ItemHelper');

// eslint-disable-next-line
const getUser = async (req, res, next) => {
  try {
    const items = await fetchItemsByUser(req.user.uid);
    res.send({ status: 200, payload: items });
  } catch (error) {
    return next(error);
  }
};

getUser.method = 'get';

exports = module.exports = getUser;

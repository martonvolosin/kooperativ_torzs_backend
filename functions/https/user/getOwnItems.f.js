const { fetchItemForUser } = require('../../firestore/ItemHelper');

// eslint-disable-next-line
const getUser = async (req, res, next) => {
  try {
    const items = await fetchItemForUser(req.user.uid);
    res.send({ status: 200, payload: items });
  } catch (error) {
    return next(error);
  }
};

getUser.method = 'get';

exports = module.exports = getUser;

const { fetchMatch } = require('../../firestore/MatchHelper');

// eslint-disable-next-line
const getUser = async (req, res, next) => {
  try {
    console.dir(req.headers);
    const match = await fetchMatch(req.headers.matchid);
    res.send({ status: 200, payload: match });
  } catch (error) {
    return next(error);
  }
};

getUser.method = 'get';

exports = module.exports = getUser;

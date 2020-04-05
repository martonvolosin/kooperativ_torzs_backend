const { fetchMatch } = require('../../firestore/MatchHelper');

// eslint-disable-next-line
const getMatch = async (req, res, next) => {
  try {
    console.dir(req.headers);
    const match = await fetchMatch(req.headers.matchid);
    res.send({ status: 200, payload: match });
  } catch (error) {
    return next(error);
  }
};

getMatch.method = 'get';

exports = module.exports = getMatch;

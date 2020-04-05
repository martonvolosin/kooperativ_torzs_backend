const { REFS, ERRORS } = require('../utils/constants');

const fetchMatch = matchId =>
  new Promise(async (resolve, reject) => {
    const match = await REFS.COLLECTIONS.MATCHES.doc(matchId).get();
    if (match) {
      return resolve(match.data())
    }
    return reject(ERRORS.NOT_FOUND_ERROR)
  });

module.exports = {
  fetchMatch
};

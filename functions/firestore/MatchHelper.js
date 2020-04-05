const { REFS, ERRORS } = require('../utils/constants');

const fetchMatch = matchId =>
  new Promise(async (resolve, reject) => {
    const user = await REFS.COLLECTIONS.MATCHES.doc(matchId).get();
    if (user) {
      return resolve(user.data())
    }
    return reject(ERRORS.NOT_FOUND_ERROR)
  });

module.exports = {
  fetchMatch
};

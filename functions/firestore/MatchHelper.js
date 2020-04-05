const { REFS, ERRORS } = require('../utils/constants');

const fetchMatch = (matchId, uid) =>
  new Promise(async (resolve, reject) => {
    const match = await REFS.COLLECTIONS.MATCHES.doc(matchId).get();
    if (match.exists) {
      let otherUserRef;
      let otherItemRef;
      const matchData = match.data();
      if (matchData.offerUserId === uid) {
        otherUserRef = await REFS.COLLECTIONS.USER.doc(matchData.requestUserId).get();
        otherItemRef = await REFS.COLLECTIONS.ITEMS.doc(matchData.requestItemId).get();
      } else {
        otherUserRef =  await REFS.COLLECTIONS.USER.doc(matchData.offerUserId).get();
        otherItemRef = await REFS.COLLECTIONS.ITEMS.doc(matchData.offerItemId).get();
      }
      matchData.otherUser = otherUserRef.data();
      matchData.otherItem = otherItemRef.data();
      return resolve(matchData);
    }
    return reject(ERRORS.NOT_FOUND_ERROR);
  });

module.exports = {
  fetchMatch
};

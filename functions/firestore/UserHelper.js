// DATABASE CONNECTED BUSINESS LOGIC
const {
  REFS: {
    COLLECTIONS: { MATCHES, USER },
  },
  ERRORS: { GENERAL_ERROR, NOT_FOUND_ERROR },
  ADMIN_AUTH
} = require("../utils/constants");

const calculateReview = (reviews) => {
  return Object.values(reviews).reduce((a, b) => a + b) / Object.keys(reviews).length;
};

const createUser = (body, uid) =>
  new Promise(async (resolve, reject) => {
    try {
      const success = await USER.doc(uid).set(Object.assign({ userId: uid }, body));
      if (success) {
        resolve()
      }
    } catch (error) {
      reject(new Error(error.message));
    }
  });

const createReview = (body, uid) =>
  new Promise(async (resolve, reject) => {
    try {
      const { matchId } = body;
      const match = (await MATCHES.doc(matchId).get()).data();
      const otherUserId = match.offerUserId === uid
        ? match.requestUserId
        : match.offerUserId;

      const otherUser = await USER.doc(otherUserId).get();
      if (otherUser.exists) {
        const previousReviews = otherUser.data().reviews
          ? otherUser.data().reviews
          : {};
        const newReviews = { [matchId]: ((Object.values(body).filter(fb => fb === true)).length * 3 + 1) };
        Object.assign(newReviews, previousReviews);
        await USER.doc(otherUserId).update({"reviews": newReviews});
        const feedbackScore = calculateReview(newReviews);
        await USER.doc(otherUserId).update({"feedbackScore": feedbackScore});
        resolve();
      }
    } catch (error) {
      reject(new Error(error.message));
    }
  });

const fetchUser = uid =>
  new Promise(async (resolve, reject) => {
    const user = await USER.doc(uid).get();
    if (user) {
      return resolve(user.data())
    } return reject(NOT_FOUND_ERROR)
  });

const removeUser = uid =>
  new Promise(async (resolve, reject) => {
    const user = await USER.doc(uid).get();
    if (user.exists) {
      const successDbDeletion = await USER.doc(uid).delete();
      const successAuthDeletion = await ADMIN_AUTH.deleteUser(uid);
      if (successDbDeletion && successAuthDeletion) {
        return resolve();
      } return reject(GENERAL_ERROR)
    } return reject(NOT_FOUND_ERROR)
  });

const modifyUser = (body, uid) =>
  new Promise(async (resolve, reject) => {
    const user = await USER.doc(uid).get();
    if (user.exists) {
      const success = await USER_REF.doc(uid).update(body);
      if (success) return resolve();
      return reject(GENERAL_ERROR);
    }
    return reject(NOT_FOUND_ERROR);
  });

module.exports = {
  createUser,
  createReview,
  fetchUser,
  removeUser,
  modifyUser,
}
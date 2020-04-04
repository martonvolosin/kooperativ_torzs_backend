// DATABASE CONNECTED BUSINESS LOGIC
const {
  REFS: {
    COLLECTIONS: { USER },
  },
  ERRORS: { GENERAL_ERROR, NOT_FOUND_ERROR },
  ADMIN_AUTH
} = require("../utils/constants");

const calculateReview = (previousFeedbackScore, newReview) => {
  const initScore = previousFeedbackScore > 0
    ? previousFeedbackScore
    : 10;
  return (initScore + (Object.values(newReview).filter(fb => fb === true)).length * 3) / 2;
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
      const user = await USER.doc(uid).get();
      if (user.exists) {
        const updatedReview = calculateReview(user.data().feedbackScore, body);
        // TODO: update other user's ID
        await USER.doc(uid).update({"feedbackScore": updatedReview});
        resolve(user.data());
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
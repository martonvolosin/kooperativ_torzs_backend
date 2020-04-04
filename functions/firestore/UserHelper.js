// DATABASE CONNECTED BUSINESS LOGIC
const {
  REFS: {
    COLLECTIONS: { USER },
  },
  ERRORS: { GENERAL_ERROR, NOT_FOUND_ERROR },
  ADMIN_AUTH
} = require("../utils/constants");

module.exports.createUser = (body, uid) =>
  new Promise(async (resolve, reject) => {
    try {
      const success = await USER.doc(uid).set(Object.assign({userId: uid}, body));
      if(success) {
          resolve()
      }
    } catch (error) {
      reject(new Error(error.message));
    }
  });

module.exports.fetchUser = uid =>
  new Promise(async (resolve, reject) => {
    const user = await USER.doc(uid).get();
    if(user) {
        return resolve(user.data())
    } return reject(NOT_FOUND_ERROR)
  });

module.exports.removeUser = uid =>
  new Promise(async (resolve, reject) => {
    const user = await USER.doc(uid).get();
    if(user.exists) {
        const successDbDeletion = await USER.doc(uid).delete();
        const successAuthDeletion = await ADMIN_AUTH.deleteUser(uid);
        if(successDbDeletion && successAuthDeletion) {
            return resolve();
        } return reject(GENERAL_ERROR)
    } return reject(NOT_FOUND_ERROR)
  });

module.exports.modifyUser = (body, uid) =>
  new Promise(async (resolve, reject) => {
    const user = await USER.doc(uid).get();
    if (user.exists) {
      const success = await USER_REF.doc(uid).update(body);
      if (success) return resolve();
      return reject(GENERAL_ERROR);
    }
    return reject(NOT_FOUND_ERROR);
  });

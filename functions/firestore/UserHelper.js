// DATABASE CONNECTED BUSINESS LOGIC
const { REFS: {
    USER_REF
}, ERRORS:  {
    GENERAL_ERROR,
    NOT_FOUND_ERROR
}} = require('../utils/constants');

module.exports.createUser = (body) => new Promise(async (resolve, reject) => {
  const {
    name
  } = body;
  try {
    console.log('INIT')
    resolve();
  } catch (error) {
    reject(new Error(error.message));
  }
});

module.exports.fetchUser = (params) => new Promise(async (resolve, reject) => {
    resolve({
        name: 'yolo',
    })
});

module.exports.removeUser = (params) => new Promise(async (resolve, reject) => {
    resolve()
});

module.exports.modifyUser = (body,uid) => new Promise(async (resolve, reject) => {
    const user = await USER_REF.doc(uid).get();
    if(user.exists) {
        const success = await USER_REF.doc(uid).update(body);
        if(success) return resolve();
        return reject(GENERAL_ERROR);
    }
    return reject(NOT_FOUND_ERROR);   
});
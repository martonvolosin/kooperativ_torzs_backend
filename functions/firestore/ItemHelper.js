const { REFS } = require('../utils/constants');

const itemsRef = REFS.DB.collection('items');

module.exports.createItem = body => new Promise(async (resolve, reject) => {
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

module.exports.modifyItem = body => new Promise(async (resolve, reject) => {
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

module.exports.removeItem = body => new Promise(async (resolve, reject) => {
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

module.exports.fetchItemForUser = userId => new Promise(async (resolve, reject) => {
  try {
    const result = await itemsRef.where('userId', '==', userId).get();
    resolve(result);
  } catch (error) {
    reject(new Error(error.message));
  }
});

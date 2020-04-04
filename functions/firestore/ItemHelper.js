const { REFS } = require('../utils/constants');

const itemsRef = REFS.DB.collection('items');

module.exports.createItem = body => new Promise(async (resolve, reject) => {
  try {
    console.log('Creating new item...')
    await itemsRef.add(body);
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
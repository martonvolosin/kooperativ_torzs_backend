const { REFS } = require('../utils/constants');

module.exports.createItem = body => new Promise(async (resolve, reject) => {
  try {
    console.log('Creating new item...');
    const result = await REFS.COLLECTIONS.ITEMS.add(body);
    resolve(result.id);
  } catch (error) {
    reject(new Error(error.message));
  }
});

module.exports.modifyItem = body => new Promise(async (resolve, reject) => {
  try {
    console.log(`Updating item '${body.itemId}'...`);
    await REFS.COLLECTIONS.ITEMS.doc(body.itemId).update(body);
    resolve();
  } catch (error) {
    reject(new Error(error.message));
  }
});

module.exports.removeItem = body => new Promise(async (resolve, reject) => {
  try {
    console.log(`Deleting item '${body.itemId}'...`);
    await REFS.COLLECTIONS.ITEMS.doc(body.itemId).delete();
    resolve();
  } catch (error) {
    reject(new Error(error.message));
  }
});

module.exports.fetchItemForUser = userId => new Promise(async (resolve, reject) => {
  try {
    const result = await REFS.COLLECTIONS.ITEMS.where('userId', '==', userId).get();
    resolve(result);
  } catch (error) {
    reject(new Error(error.message));
  }
});

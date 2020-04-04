const { REFS, GEO_DISTANCES, ITEM_STATUSES, ITEM_TYPES } = require('../utils/constants');
const Distance = require('geo-distance');

const createItem = body => new Promise(async (resolve, reject) => {
  try {
    console.log('Creating new item...');
    const result = await REFS.COLLECTIONS.ITEMS.add(body);
    resolve(result.id);
  } catch (error) {
    reject(new Error(error.message));
  }
});

const modifyItem = body => new Promise(async (resolve, reject) => {

  try {
    console.log(`Updating item '${body.itemId}'...`);
    await REFS.COLLECTIONS.ITEMS.doc(body.itemId).update(body);
    resolve();
  } catch (error) {
    reject(new Error(error.message));
  }
});

const removeItem = body => new Promise(async (resolve, reject) => {
  try {
    console.log(`Deleting item '${body.itemId}'...`);
    await REFS.COLLECTIONS.ITEMS.doc(body.itemId).delete();
    resolve();
  } catch (error) {
    reject(new Error(error.message));
  }
});

const fetchItemForUser = userId => new Promise(async (resolve, reject) => {
  try {
    const result = await REFS.COLLECTIONS.ITEMS.where('userId', '==', userId).get();
    resolve(result);
  } catch (error) {
    reject(new Error(error.message));
  }
});

const closerThanMax = (item) => {
  return otherItem => {
    if (!item.location || !otherItem.location) {
      return false;
    }
    return Distance.between(
      {lat: item.location.lat, lon: item.location.lon},
      {lat: otherItem.location.lat, lon: otherItem.location.lon}
    ) < Distance(GEO_DISTANCES.MAX_DISTANCE)
  };
};

const findMatchingItems = itemId => new Promise(async (resolve, reject) => {
  try {
    const item = (await REFS.COLLECTIONS.ITEMS.doc(itemId).get()).data();
    const otherType = item.type === ITEM_TYPES.OFFER ? ITEM_TYPES.REQUEST : ITEM_TYPES.OFFER;
    const itemsFromDB = (await REFS.COLLECTIONS.ITEMS
      .where('type', '==', otherType)
      .where('categoryId', '==', item.categoryId)
      .where('status', '==', ITEM_STATUSES.AVAILABLE)
      .get());
    if (itemsFromDB.empty) {
      resolve([]);
    } else {
      const itemsToConsider = [];
      itemsFromDB.forEach((itemToConsider) => itemsToConsider.push(itemToConsider.data()));
      resolve(itemsToConsider.filter(closerThanMax(item)));
    }
  } catch (error) {
    reject(new Error(error.message));
  }
});

module.exports = {
  createItem,
  modifyItem,
  removeItem,
  fetchItemForUser,
  findMatchingItems
};

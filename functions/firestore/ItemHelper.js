const { REFS, GEO_DISTANCES } = require('../utils/constants');
const Distance = require('geo-distance');

const createItem = body => new Promise(async (resolve, reject) => {
  try {
    console.log('Creating new item...')
    const result = await REFS.COLLECTIONS.ITEMS.add(body);
    resolve(result.id);
  } catch (error) {
    reject(new Error(error.message));
  }
});

const modifyItem = body => new Promise(async (resolve, reject) => {
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

const removeItem = body => new Promise(async (resolve, reject) => {
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

const fetchItemForUser = userId => new Promise(async (resolve, reject) => {
  try {
    const result = await REFS.COLLECTIONS.ITEMS.where('userId', '==', userId).get();
    resolve(result);
  } catch (error) {
    reject(new Error(error.message));
  }
});

const closerThanMax = (item) => {
  return otherItem => (
    Distance.between(
      {lat: item.lat, lon: item.lon},
      {lat: otherItem.lat, lon: otherItem.lon}
    ) < Distance(GEO_DISTANCES.MAX_DISTANCE)
  );
};

const findMatchingItems = itemId => new Promise(async (resolve, reject) => {
  try {
    const item = (await REFS.COLLECTIONS.ITEMS.doc(itemId).get()).data();
    const otherType = item.type === 'OFFER' ? 'REQUEST' : 'OFFER';
    const itemsToConsider = await REFS.COLLECTIONS.ITEMS
      .where('lat', '>', item.lat - GEO_DISTANCES.MAX_LAT_DIFF)
      .where('lat', '<', item.lat + GEO_DISTANCES.MAX_LAT_DIFF)
      .where('lon', '<', item.lon - GEO_DISTANCES.MAX_LON_DIFF)
      .where('lon', '<', item.lon + GEO_DISTANCES.MAX_LON_DIFF)
      .where('type', '==', otherType)
      .where('categoryId', '==', item.categoryId)
      .get();
    itemsToConsider.filter(closerThanMax(item));
    resolve(itemsToConsider);
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

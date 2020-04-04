const { REFS, GEO_DISTANCES } = require('../utils/constants');
const Distance = require('geo-distance');

module.exports.createItem = body => new Promise(async (resolve, reject) => {
  try {
    console.log('Creating new item...')
    const result = await REFS.COLLECTIONS.ITEMS.add(body);
    resolve(result.id);
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
    const result = await REFS.COLLECTIONS.ITEMS.where('userId', '==', userId).get();
    resolve(result);
  } catch (error) {
    reject(new Error(error.message));
  }
});

function closerThanMax(item) {
  return otherItem => (
    Distance.between(
      {lat: item.lat, lon: item.lon},
      {lat: otherItem.lat, lon: otherItem.lon}
    ) < Distance(GEO_DISTANCES.MAX_DISTANCE)
  );
}

module.exports.findMatchingItems = item => new Promise(async (resolve, reject) => {
  try {
    const otherType = item.type === 'OFFER' ? 'REQUEST' : 'OFFER';
    const itemsToConsider = await REFS.COLLECTIONS.ITEMS
      .where('lat', '>', item.lat - GEO_DISTANCES.MAX_LAT_DIFF)
      .where('lat', '<', item.lat + GEO_DISTANCES.MAX_LAT_DIFF)
      .where('lon', '<', item.lon - GEO_DISTANCES.MAX_LON_DIFF)
      .where('lon', '<', item.lon + GEO_DISTANCES.MAX_LON_DIFF)
      .where('type', '==', otherType)
      .where('categoryId', '==', item.categoryId)
      .get().data();
    itemsToConsider.filter(closerThanMax(item));
    resolve(itemsToConsider);
  } catch (error) {
    reject(new Error(error.message));
  }
});

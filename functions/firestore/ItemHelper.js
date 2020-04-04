const { REFS, GEO_DISTANCES, ITEM_STATUSES, ITEM_TYPES } = require('../utils/constants');
const Distance = require('geo-distance');

const createItem = body => new Promise(async (resolve, reject) => {
  try {
    console.log('Creating new item...');
    const result = await REFS.COLLECTIONS.ITEMS.add(body);
    await findMatchingItems(result.id);
    resolve(result.id);
  } catch (error) {
    reject(new Error(error.message));
  }
});

const modifyItem = body => new Promise(async (resolve, reject) => {
  try {
    console.log(`Updating item '${body.itemId}'...`);
    await REFS.COLLECTIONS.ITEMS.doc(body.itemId).update(body);
    // TODO if still AVAIALABLE, call findMatchingItems
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
    const querySnapshot = await REFS.COLLECTIONS.ITEMS.where('userId', '==', userId).get();
    const result = [];
    querySnapshot.forEach((item) => result.push(item.data()));
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

const findMatchingItems = async itemId => {
  const item = (await REFS.COLLECTIONS.ITEMS.doc(itemId).get()).data();
  const otherType = item.type === ITEM_TYPES.OFFER ? ITEM_TYPES.REQUEST : ITEM_TYPES.OFFER;
  const itemsFromDB = (await REFS.COLLECTIONS.ITEMS
    .where('type', '==', otherType)
    .where('categoryId', '==', item.categoryId)
    .where('status', '==', ITEM_STATUSES.AVAILABLE)
    .get());
  if (!itemsFromDB.empty) {
    const itemsToConsider = [];
    itemsFromDB.forEach((itemToConsider) => itemsToConsider.push(itemToConsider.data()));
    const itemMatches = itemsToConsider.filter(closerThanMax(item));
    if (itemMatches.length > 0) {
      const matchIds = [];
      for(const itemMatch of itemMatches) {
        const match = {
          offerUserId: item.type === ITEM_TYPES.OFFER ? item.userId : itemMatch.userId,
          requestUserId: item.type === ITEM_TYPES.REQUEST ? item.userId : itemMatch.userId,
          offerItemId: item.type === ITEM_TYPES.OFFER ? item.id : itemMatch.id,
          requestItemId: item.type === ITEM_TYPES.REQUEST ? item.id : itemMatch.id,
          status: 'TODO'
        };
        const result = await REFS.COLLECTIONS.MATCHES.add(match);
        // TODO transaction
        const dbMatches = (await REFS.COLLECTIONS.USER.doc(itemMatch.userId).get()).data().matches ?? [];
        dbMatches.push(result.id);
        REFS.COLLECTIONS.USER.doc(itemMatch.userId).update({ matches: dbMatches });
        matchIds.push(result.id);
      }
      const sourceUser = item.userId;
      // TODO transaction
      const dbMatches = (await REFS.COLLECTIONS.USER.doc(sourceUser).get()).data().matches ?? [];
      dbMatches.push(...matchIds);
      REFS.COLLECTIONS.USER.doc(sourceUser).update({ matches: dbMatches });
    }
  }
};

module.exports = {
  createItem,
  modifyItem,
  removeItem,
  fetchItemForUser
};

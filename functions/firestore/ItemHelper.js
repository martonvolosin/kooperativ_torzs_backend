const { REFS, GEO_DISTANCES, ITEM_STATUSES, ITEM_TYPES, MATCH_STATUSES, ERRORS } = require('../utils/constants');
const Distance = require('geo-distance');

const createItem = body => new Promise(async (resolve, reject) => {
  try {
    console.log('Creating new item...');
    body.status = 'AVAILABLE';
    const result = await REFS.COLLECTIONS.ITEMS.add(body);
    await findMatchingItems(result.id);
    resolve(result.id);
  } catch (error) {
    reject(new Error(error.message));
  }
});

const modifyItem = body => new Promise(async (resolve, reject) => {
  try {
    console.log(`Updating item '${(body.itemId)}'...`);
    const oldItem = await REFS.COLLECTIONS.ITEMS.doc(body.itemId).get();
    if (!oldItem.exists) {
      reject(ERRORS.NOT_FOUND_ERROR);
    }
    await REFS.COLLECTIONS.ITEMS.doc(body.itemId).update(body);
    if (oldItem.data().status !== ITEM_STATUSES.AVAILABLE && body.status === ITEM_STATUSES.AVAILABLE) {
      await findMatchingItems(body.itemId);
    }
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

const closerThanMaxAndNotSameUser = (item) => {
  return otherItem => {
    if (item.userId === otherItem.userId || !item.location || !otherItem.location) {
      return false;
    }
    return Distance.between(
      {lat: item.location.lat, lon: item.location.lon},
      {lat: otherItem.location.lat, lon: otherItem.location.lon}
    ) < Distance(GEO_DISTANCES.MAX_DISTANCE)
  };
};

const addMatchesToUser = async (userId, matchIds) => {
  // TODO transaction
  const dbMatches = (await REFS.COLLECTIONS.USER.doc(userId).get()).data().matches;
  const resultMatches = dbMatches ? dbMatches : [];
  resultMatches.push(...matchIds);
  REFS.COLLECTIONS.USER.doc(userId).update({matches: resultMatches});
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
    itemsFromDB.forEach((itemToConsider) => itemsToConsider.push(Object.assign(itemToConsider.data(), {id: itemToConsider.id})));
    const itemMatches = itemsToConsider.filter(closerThanMaxAndNotSameUser(item));
    if (itemMatches.length) {
      const matchIds = [];
      for(const itemMatch of itemMatches) {
        const match = {
          offerUserId: item.type === ITEM_TYPES.OFFER ? item.userId : itemMatch.userId,
          requestUserId: item.type === ITEM_TYPES.REQUEST ? item.userId : itemMatch.userId,
          offerItemId: item.type === ITEM_TYPES.OFFER ? itemId : itemMatch.id,
          requestItemId: item.type === ITEM_TYPES.REQUEST ? itemId : itemMatch.id,
          status: MATCH_STATUSES.OPEN
        };
        const result = await REFS.COLLECTIONS.MATCHES.add(match);
        await addMatchesToUser(itemMatch.userId, [result.id]);
        matchIds.push(result.id);
      }
      await addMatchesToUser(item.userId, matchIds);
    }
  }
};

module.exports = {
  createItem,
  modifyItem,
  removeItem,
  fetchItemForUser
};

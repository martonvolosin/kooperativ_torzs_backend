const functions = require('firebase-functions');
const { MATCH_STATUSES:
    { ONGOING, OPEN, CLOSED },
    REFS: { COLLECTIONS: { MATCHES, ITEMS },
    RT_REFS: { CHAT },
    },
    ITEM_STATUSES
} = require('../../utils/constants');

const initChat = (offerUserId, requestUserId) => ({ offerUserId, requestUserId, timestamp: new Date().getTime() });

/**
 * Listens to status changes in the firestore db
 * creates/deletes chat items in RealTime db
 * blocks item
 */
module.exports = functions.firestore.document('matches/{matchId}').onUpdate(async (change, context) => {
    const newStatus = change.after.data().status;
    const oldStatus = change.before.data().status;
    if(oldStatus === newStatus) return;

    const matchId = context.params.matchId;
    const matchRef = await MATCHES.doc(matchId).get();
    if(!matchRef) return;

    const { offerUserId, requestUserId, requestItemId, offerItemId } = matchRef.data();
    const chatRef = await CHAT.child(matchId).once('value');

    // init chat, setting items on hold in case of an ongoing match
    if(newStatus === ONGOING) {
        await CHAT.child(matchId).set(initChat(offerUserId,requestUserId));
        await ITEMS.doc(requestItemId).update({ status: ITEM_STATUSES.ON_HOLD });
        await ITEMS.doc(offerItemId).update({ status: ITEM_STATUSES.ON_HOLD });
    }
    if(newStatus === OPEN) {
        await ITEMS.doc(requestItemId).update({ status: ITEM_STATUSES.AVAILABLE });
        await ITEMS.doc(offerItemId).update({ status: ITEM_STATUSES.AVAILABLE });
    }

    // closing chat if the transaction is done
    if([OPEN, CLOSED].includes(newStatus) && chatRef.exists) {
        await CHAT.child(matchId).remove();
    }
    return;
})



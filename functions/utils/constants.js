const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccount.json');

const DATABASE_URL = 'https://kooperativ-torzs.firebaseio.com';
const ENV = 'TEST'; // 'TEST' || 'PRODUCTION' || 'EMULATOR'


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: DATABASE_URL
});

const ADMIN_AUTH = admin.auth();

// HTTP Status Messages
const STATUS_201 = 'Created';
const STATUS_200 = 'OK';
const STATUS_204 = 'Resource updated';
const STATUS_400 = 'AlreadyInDatabase';
const STATUS_401 = 'Unauthorized';

// ERROR CONSTANTS
const UNAUTHORIZED_ERROR = 'Unauthorized';
const ALREADY_IN_DATABASE_ERROR = 'AlreadyInDatabase';
const VALIDATION_ERROR = 'ValidationError';
const PROPERTY_REQUIRED_ERROR = 'PropertyRequiredError';
const NOT_FOUND_ERROR = 'NotFound';
const FIRESTORE_ERROR = 'FirestoreError';
const GENERAL_ERROR = 'GeneralError';
const NO_PROPERTY_ERROR = 'No property: ';

// ITEM TYPES
const ITEM_TYPES =
    ['BARTER',
        'OFFER',
        'REQUEST',
        'HELP',]

// ITEM STATUSES
const ITEM_STATUSES =
    [
        'AVAILABLE',
        'ON_HOLD',
        'TAKEN',
    ]

const db = admin.firestore();

const items = db.collection('items');

module.exports = {
    STATUS_CODES: {
        STATUS_200,
        STATUS_201,
        STATUS_204,
        STATUS_400,
        STATUS_401,
    },
    ERRORS: {
        UNAUTHORIZED_ERROR,
        NOT_FOUND_ERROR,
        PROPERTY_REQUIRED_ERROR,
        VALIDATION_ERROR,
        FIRESTORE_ERROR,
        ALREADY_IN_DATABASE_ERROR,
        GENERAL_ERROR,
        NO_PROPERTY_ERROR,
    },
    ENVIRONMENT: {
        env: ENV,
        testDb: DATABASE_URL,
    },
    REFS: {
        DB: db,
        COLLECTIONS: {
            ITEMS: items,
        }
    },
    ADMIN_AUTH,
    ITEM_TYPES,
    ITEM_STATUSES,
}
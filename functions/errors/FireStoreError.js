const { ERRORS } = require('../utils/constants');

module.exports = class FirestoreError extends Error {
  constructor(message) {
    super(message);
    this.name = ERRORS.FIRESTORE_ERROR;
  }
};

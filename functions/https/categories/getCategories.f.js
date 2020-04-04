const { fetchCategories } = require('../../firestore/CategoryHelper');
const { STATUS_CODES: {
    STATUS_200
}, ERRORS: {
    NOT_FOUND_ERROR,
}} = require('../../utils/constants');

const getCategories = (req, res, next) => {
    const categories = fetchCategories();
    if(categories) {
        return res.send({ status: 200, message: STATUS_200, categories });
    } return res.send({ status: 404, message: NOT_FOUND_ERROR });
}

getCategories.method = 'get';

module.exports = getCategories;
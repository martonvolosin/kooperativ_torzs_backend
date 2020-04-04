const categories = require('../resources/categories.json');

const fetchCategories = () => {
    return categories;
}

module.exports = {
    fetchCategories
}
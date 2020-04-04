const yup = require('yup');
const { ITEM_STATUSES } = require('../../utils/constants');

module.exports = yup.object().shape({
    body: yup.object().shape({
        itemId: yup.string().required(),
        categoryId: yup.string(),
        quantity: yup.number(),
        unit: yup.string(),
        description: yup.string(),
        counterValue: yup.string(),
        status: yup.mixed().oneOf(Object.values(ITEM_STATUSES)),
    })
});

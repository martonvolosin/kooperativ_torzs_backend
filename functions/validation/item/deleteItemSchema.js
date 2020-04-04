const yup = require('yup');

module.exports = yup.object().shape({
    body: yup.object().shape({
        itemId: yup.string().required(),
    })
});
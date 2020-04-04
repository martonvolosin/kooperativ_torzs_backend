const yup = require('yup');
const location  = require('../subSchemas/locationSchema');

module.exports = yup.object().shape({
    body: yup.object().shape({
        phoneNumber: yup.string(),
        displayName: yup.string(),
        location
    })
});
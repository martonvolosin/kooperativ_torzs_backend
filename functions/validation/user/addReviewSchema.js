const yup = require('yup');

module.exports = yup.object().shape({
    body: yup.object().shape({
        overallSatisfied: yup.boolean().required(),
        satisfiedWithItem: yup.boolean().required(),
        satisfiedWithTransaction: yup.boolean().required(),
    })
});
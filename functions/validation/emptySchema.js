const yup = require('yup');

module.exports = yup.object().shape({
    params: yup.object()
});
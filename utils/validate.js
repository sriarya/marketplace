const { isEmpty, pickBy } = require('lodash');

const validateRegistrationPayload = (data) => {
    const { firstName = '', lastName = '', type = '', password = '', email = '' } = data;
    const payload = {
        firstName,
        lastName,
        type,
        email,
        password
    };

    const isDataIncomplete = pickBy(payload, isEmpty);
    console.log("🚀 ~ file: validate.js ~ line 13 ~ validateRegistrationPayload ~ isDataIncomplete", isDataIncomplete)
    return isDataIncomplete ? true : false
}

module.exports = {
    validateRegistrationPayload
}
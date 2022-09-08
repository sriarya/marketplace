const { isEmpty, pickBy } = require('lodash');

const validatePayload = (payload) => {
    const missingData = pickBy(payload, isEmpty);
    const isValidPayload = isEmpty(missingData) ? true : false
    return isValidPayload
}

module.exports = {
    validatePayload
}
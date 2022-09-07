
const generateId = (prefix) => {
    const uniqueId = `${prefix - Math.ceil(moment().valueOf() * Math.random())}`;
    return uniqueId;
}

module.exports = {
    generateId
}
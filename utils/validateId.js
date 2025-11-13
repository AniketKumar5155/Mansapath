function validateId(id) {
    const parsedId = Number(id);
    if (isNaN(parsedId) || parsedId <= 0) {
        throw new Error('Invalid ID');
    }
    return parsedId;
}

module.exports = validateId;

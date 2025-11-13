const bcrypt = require('bcrypt');

const hashData = async (data) => {
    const saltRounds = 10;
    const hashedData = await bcrypt.hash(data, saltRounds);
    return hashedData;
}

module.exports = {
    hashData,
};
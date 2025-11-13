const { Users } = require("../models");
const { validateData } = require("../utils/validateData");
const jwt = require('jsonwebtoken');

const employeeLogin = async(email, password) => {
    const user = await Users.findOne({ where: { email } });
    const isValid = await validateData(password, user.password_hash);

    if (!isValid) {
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    user.token = token;

    return user;
}
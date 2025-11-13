const { User } = require("../models");
const verifyData = require("../utils/validateData");
const generateTokens = require("../utils/generateTokens");

const employeeLogin = async (email, password) => {
    const user = await User.findOne({
        where: {
            email
        }
    });

    if (!user) throw new Error("User not found");

    const isPasswordValid = await verifyData(password, user.password_hash);
    if (!isPasswordValid) throw new Error("Incorrect password");

    const { accessToken, refreshToken } = await generateTokens({
        userId: user.id,
        email: user.email,
        role: user.role,
    });

    return { 
        user, 
        accessToken, 
        refreshToken 
    };
}

module.exports = {
    employeeLogin
};
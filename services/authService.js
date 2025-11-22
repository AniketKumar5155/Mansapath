const { User, RefreshToken } = require("../models");
const verifyData = require("../utils/validateData");
const generateTokens = require("../utils/generateTokens");

const employeeLogin = async (email, password, ip, userAgent) => {

  const user = await User.findOne({ where: { email } });

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
// 
//   if (!user.isActive) {
    // const error = new Error("Account disabled");
    // error.statusCode = 403;
    // throw error;
//   }

  const isPasswordValid = await verifyData(password, user.password_hash);

  if (!isPasswordValid) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const { accessToken, refreshToken } = generateTokens({
    userId: user.id,
    email: user.email,
    role: user.role
  });

  await RefreshToken.create({
    user_id: user.id,
    token: refreshToken,
    ip,
    user_agent: userAgent,
    expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  });

  const safeUser = {
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name
  };

  return { user: safeUser, accessToken, refreshToken };
};

module.exports = { employeeLogin };

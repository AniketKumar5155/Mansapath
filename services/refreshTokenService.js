const jwt = require("jsonwebtoken");
const { RefreshToken, User } = require("../models");
const generateTokens = require("../utils/generateTokens");

const refreshAccessToken = async (refreshToken) => {

  if (!refreshToken) {
    const error = new Error("No refresh token provided");
    error.statusCode = 401;
    throw error;
  }

  const storedToken = await RefreshToken.findOne({
    where: { token: refreshToken }
  });

  if (!storedToken) {
    const error = new Error("Invalid refresh token");
    error.statusCode = 403;
    throw error;
  }

  if (storedToken.expires_at < new Date()) {
    const error = new Error("Refresh token expired");
    error.statusCode = 403;
    throw error;
  }

  const decoded = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const user = await User.findByPk(decoded.userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const { accessToken } = generateTokens({
    userId: user.id,
    email: user.email,
    role: user.role
  });

  return { accessToken };
};

module.exports = { refreshAccessToken };

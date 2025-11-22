const { refreshAccessToken } = require("../services/refreshTokenService");

const refreshController = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    const { accessToken } = await refreshAccessToken(refreshToken);

    return res.status(200).json({
      success: true,
      accessToken
    });

  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error"
    });
  }
};

module.exports = { refreshController };
    
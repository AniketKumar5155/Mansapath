const { employeeLogin, getProfileService } = require("../services/authService");
const { loginSchema } = require("../validator/loginSchema");
const { RefreshToken } = require("../models");

const loginController = async (req, res) => {
  try {
    const data = loginSchema.parse(req.body);

    const { user, accessToken, refreshToken } = await employeeLogin(
      data.email,
      data.password,
      req.ip,
      req.headers["user-agent"]
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      user
    });

  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error"
    });
  }
};


const logoutController = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      await RefreshToken.destroy({ where: { token: refreshToken } });

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
      });
    }

    res.status(200).json({
      success: true,
      message: "Logout successful"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

const getProfileController = async (req, res) => {
  try {
    const userId = req.user.id;

    const profileData = await getProfileService(userId)

    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: profileData,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal Server Error",
    })
  }
}



module.exports = {
  loginController,
  logoutController,
  getProfileController,
};

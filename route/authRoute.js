const express = require("express");
const { loginController, logoutController, getProfileController } = require("../controllers/authController");
const { refreshController } = require("../controllers/refreshTokenController");
const authMiddleware = require("../middleware/authMiddleware");

const authRouter = express.Router();

authRouter.post("/login", loginController)
authRouter.post("/refresh", refreshController);
authRouter.post("/logout", logoutController);
authRouter.get("/profile/me", authMiddleware, getProfileController)

module.exports = authRouter;

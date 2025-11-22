const express = require("express");
const { loginController, logoutController } = require("../controllers/authController");
const { refreshController } = require("../controllers/refreshTokenController");

const authRouter = express.Router();

authRouter.post("/login", loginController)
authRouter.post("/refresh", refreshController);
authRouter.post("/logout", logoutController);

module.exports = authRouter;

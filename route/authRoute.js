const express = require('express');
const authRoute = express.Router();

const { loginController, logoutController } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

authRoute.post('/login', loginController);
authRoute.post('/logout', authMiddleware, logoutController);

module.exports = authRoute;

const express = require('express');
const authRoute = express.Router();

const { loginController } = require("../controllers/authController");

authRoute.post('/login', loginController);

module.exports = authRoute;

const express = require("express")

const userQueryRouter = express.Router()

const {
    createUserQueryController
} = require("../controllers/userQueryController");

userQueryRouter.post("/submit", createUserQueryController);

module.exports = userQueryRouter;
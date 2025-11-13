const express = require('express');

const employeeRoute = express.Router();

const {
    createNewEmployee,
} = require("../controllers/employeeController");

const { validateEmployee } = require("../middleware/validationMiddleware");

employeeRoute.post('/create', validateEmployee, createNewEmployee);

module.exports = employeeRoute;
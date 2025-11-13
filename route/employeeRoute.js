const express = require('express');

const employeeRoute = express.Router();

const {
    createNewEmployee,
} = require("../controllers/employeeController");

const { validateZod } = require("../middleware/validationMiddleware");
const { employeeSchema } = require("../validator/employeeSchema");

employeeRoute.post('/create', validateZod(employeeSchema), createNewEmployee);

module.exports = employeeRoute;
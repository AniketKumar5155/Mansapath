const express = require('express');

const employeeRoute = express.Router();

const {
    createNewEmployee,
    getAllEmployees,
} = require("../controllers/employeeController");

const { validateEmployee } = require("../middleware/validationMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

employeeRoute.post('/create-employee', authMiddleware, authorize(['SUPERADMIN']), validateEmployee, createNewEmployee);
employeeRoute.get('/employees', authMiddleware, authorize(['SUPERADMIN']), getAllEmployees);

module.exports = employeeRoute;
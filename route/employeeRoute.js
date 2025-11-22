const express = require('express');

const employeeRoute = express.Router();

const {
    createNewEmployee,
    getAllEmployeesController,
    getEmployeesController,
} = require("../controllers/employeeController");

const { validateEmployee } = require("../middleware/validationMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

employeeRoute.post('/create-employee', authMiddleware, authorize(['SUPERADMIN']), validateEmployee, createNewEmployee);
employeeRoute.get('/employees', authMiddleware, authorize(['SUPERADMIN']), getEmployeesController);
employeeRoute.get("/all-employees", authMiddleware, authorize(['SUPERADMIN']), getAllEmployeesController )

module.exports = employeeRoute;
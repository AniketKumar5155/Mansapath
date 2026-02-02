const express = require("express");

const employeeRoute = express.Router();

const {
  createNewEmployee,
  getAllEmployeesController,
  getEmployeesController,
  updateEmployeeController,
  getEmployeeByIdController,
} = require("../controllers/employeeController");

const {
  validateEmployee,
  validateEmployeeUpdate
} = require("../middleware/validationMiddleware");

const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");


employeeRoute.post(
  "/create-employee",
  // authMiddleware,
  // authorize(["SUPERADMIN"]),
  validateEmployee,
  createNewEmployee
);

employeeRoute.get(
  "/employees",
  authMiddleware,
  authorize(["SUPERADMIN"]),
  getEmployeesController
);

employeeRoute.get(
  "/all-employees",
  authMiddleware,
  authorize(["SUPERADMIN"]),
  getAllEmployeesController
);

employeeRoute.get(
  "/employee/:id",
  authMiddleware,
  authorize(["SUPERADMIN"]),
  getEmployeeByIdController,
)

employeeRoute.put(
  "/update-employee/:id",
  authMiddleware,
  authorize(["SUPERADMIN"]),
  validateEmployeeUpdate,
  updateEmployeeController
);


module.exports = employeeRoute;

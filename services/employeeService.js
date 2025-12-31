const { User } = require("../models");
const validateId = require("../utils/validateId");
const { Op } = require("sequelize");
const { hashData } = require("../utils/bcrypt");

const createEmployee = async (employeeData) => {
  const { password, ...rest } = employeeData;

  if (!password) throw new Error("Password is required");

  const password_hash = await hashData(password);

  return await User.create({
  ...rest,
  password_hash,
});

};

const getAllEmployeesService = async () => {
  const employees = await User.findAll();
  return employees
}

const getEmployeesService = async ({
  sortType = "created_at",
  sortDirection = "ASC",
  page = 1,
  limit = 10,
  search = "",
}) => {
  const safeOrder = sortDirection.toUpperCase() === "ASC" ? "ASC" : "DESC";

  const offset = (page - 1) * limit;

  const whereClause = { role: "EMPLOYEE" };

  if (search.trim() !== "") {
    whereClause[Op.or] = [
      { first_name: { [Op.like]: `%${search}%` } },
      { middle_name: { [Op.like]: `%${search}%` } },
      { last_name: { [Op.like]: `%${search}%` } },
      { email: { [Op.like]: `%${search}%` } },
      { phone_number: { [Op.like]: `%${search}%` } },
    ];
  }

  const { rows, count } = await User.findAndCountAll({
    where: whereClause,
    order: [[sortType, safeOrder]],
    limit,
    offset,
  });

  return {
    employees: rows,
    totalItems: count,
    currentPage: page,
    totalPages: Math.ceil(count / limit),
    limit,
  };
};

const getEmployeeByIdService = async (id) => {
  validateId(id);
  const admin = await User.findByPk(id);
  if(!admin){
    const error = new Error("Employee not found");
    error.statusCode = 404;
    throw error;
  }
  return admin;
}

const updateEmployee = async (id, updatedData) => {
  validateId(id);

  const employee = await User.findByPk(id);
  if (!employee) throw new Error("Employee not found");
  if (employee.is_deleted) throw new Error("Cannot update a deleted employee");

  if (updatedData.password) {
    updatedData.password_hash = await hashData(updatedData.password);
    delete updatedData.password;
  }

  await employee.update(updatedData);
  return employee;
};

module.exports = {
  createEmployee,
  getAllEmployeesService,
  getEmployeesService,
  getEmployeeByIdService,
  updateEmployee,
};

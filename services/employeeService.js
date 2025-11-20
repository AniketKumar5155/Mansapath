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

const getAllEmployeesService = async ({
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

// const softDeleteEmployee = async (id) => {
  // validateId(id);
// 
  // const employee = await User.findByPk(id);
  // if (!employee) throw new Error("Employee not found");
  // if (employee.is_deleted) throw new Error("Employee already deleted");
// 
  // employee.is_deleted = true;
  // await employee.save();
  // return employee;
// };

// const restoreEmployee = async (id) => {
  // validateId(id);
// 
  // const employee = await User.findByPk(id);
  // if (!employee) throw new Error("Employee not found");
  // if (!employee.is_deleted) throw new Error("Employee is not deleted");
// 
  // employee.is_deleted = false;
  // await employee.save();
  // return employee;
// };

// const archiveEmployee = async (id) => {
  // validateId(id);
// 
  // const employee = await User.findByPk(id);
  // if (!employee) throw new Error("Employee not found");
  // if (employee.is_archived) throw new Error("Employee already archived");
// 
  // employee.is_archived = true;
  // await employee.save();
  // return employee;
// }

// const unarchiveEmployee = async (id) => {
  // validateId(id);
// 
  // const employee = await User.findByPk(id);
  // if (!employee) throw new Error("Employee not found");
  // if (!employee.is_archived) throw new Error("Employee is not archived");
// 
  // employee.is_archived = false;
  // await employee.save();
  // return employee;
// };

module.exports = {
  createEmployee,
  getAllEmployeesService,
  updateEmployee,
  // softDeleteEmployee,
  // restoreEmployee,
  // archiveEmployee,
  // unarchiveEmployee, 
};

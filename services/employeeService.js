const { User } = require("../models");
const { hashData } = require("../utils/bcrypt");

const createEmployee = async (employeeData) => {
  try {
    const { password, ...rest } = employeeData;

    if (!password) {
      throw new Error("Password is required");
    }

    const password_hash = await hashData(password);

    const employee = await User.create({
      ...rest,
      password_hash,
    });

    return employee;
  } catch (error) {
    console.error("Error creating employee:", error.message);
    throw error;
  }
};

module.exports = {
    createEmployee,
};
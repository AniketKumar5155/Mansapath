const {
    createEmployee,
} = require("../services/employeeService");

const createNewEmployee = async (req, res) => {
    try {
         const newEmployee = await createEmployee(req.validatedData);

         return res.status(201).json({
             success: true,
             message: 'Employee created successfully!',
             data: newEmployee,
         });
    }catch(error){
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        })
    }
}

module.exports = {
    createNewEmployee,
};
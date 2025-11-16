const {
    createEmployee,
    getAllEmployeesService,
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

const getAllEmployees = async (req, res) => {
    try {
        const sortType = req.query.sort || 'created_at';
        const sortDirection = req.query.order?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
        const employees = await getAllEmployeesService({
            sortType,
            sortDirection,
        });
        return res.json({
            success: true,
            message: 'Employees retrieved successfully',
            data: employees,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
};

module.exports = {
    createNewEmployee,
    getAllEmployees,
};
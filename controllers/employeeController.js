const {
    createEmployee,
    getAllEmployeesService,
    getEmployeesService,
    updateEmployee,
} = require("../services/employeeService");

const createNewEmployee = async (req, res) => {
    try {
        const newEmployee = await createEmployee(req.validatedData);

        return res.status(201).json({
            success: true,
            message: 'Employee created successfully!',
            data: newEmployee,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
};

const getAllEmployeesController = async (req, res) => {
    try{
        const employees  = await getAllEmployeesService();
        return res.status(200).json({
            success: true,
            message: "All employees fetched successfully",
            data: employees,
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Failed to fetched all employees"
        })
    }
}

const getEmployeesController = async (req, res) => {
    try {
        const sortType = req.query.sortType || 'created_at';
        const sortDirection = req.query.sortDirection?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

        const page = req.query.page ? Number(req.query.page) : 1;
        const limit = req.query.limit ? Number(req.query.limit) : 10;
        const search = req.query.search || "";

        const employees = await getEmployeesService({
            sortType,
            sortDirection,
            page,
            limit,
            search,
        });

        return res.json({
            success: true,
            message: 'Employees retrieved successfully',
            data: employees,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
};

const updateEmployeeController = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await updateEmployee(id, req.validatedData);

        return res.json({
            success: true,
            message: "Employee updated successfully",
            data: employee,
        });

    } catch (error) {
        if (error.message === "Employee not found" || error.message === "Cannot update a deleted employee") {
            return res.status(404).json({
                success: false,
                error: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
};

module.exports = {
    createNewEmployee,
    getAllEmployeesController,
    getEmployeesController,
    updateEmployeeController,
};

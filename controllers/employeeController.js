const {
    createEmployee,
    getAllEmployeesService,
    getEmployeesService,
    updateEmployee,
    // softDeleteEmployee,
    // restoreEmployee,
    // archiveEmployee,
    // unarchiveEmployee,
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

// const softDeleteEmployeeController = async (req, res) => {
    // try {
        // const { id } = req.params;
        // const employee = await softDeleteEmployee(id);
// 
        // return res.json({
            // success: true,
            // message: "Employee soft deleted successfully",
            // data: employee,
        // });
// 
    // } catch (error) {
        // if (error.message === "Employee not found" || error.message === "Employee already deleted") {
            // return res.status(404).json({
                // success: false,
                // error: error.message,
            // });
        // }
        // return res.status(500).json({
            // success: false,
            // error: "Internal Server Error",
        // });
    // }
// };

// const restoreEmployeeController = async (req, res) => {
    // try {
        // const { id } = req.params;
        // const employee = await restoreEmployee(id);
// 
        // return res.json({
            // success: true,
            // message: "Employee restored successfully",
            // data: employee,
        // });
// 
    // } catch (error) {
        // if (error.message === "Employee not found" || error.message === "Employee is not deleted") {
            // return res.status(404).json({
                // success: false,
                // error: error.message,
            // });
        // }
        // return res.status(500).json({
            // success: false,
            // error: "Internal Server Error",
        // });
    // }
// };

// const archiveEmployeeController = async (req, res) => {
    // try {
        // const { id } = req.params;
        // const employee = await archiveEmployee(id);
// 
        // return res.json({
            // success: true,
            // message: "Employee archived successfully",
            // data: employee,
        // });
// 
    // } catch (error) {
        // if (error.message === "Employee not found" || error.message === "Employee already archived") {
            // return res.status(404).json({
                // success: false,
                // error: error.message,
            // });
        // }
        // return res.status(500).json({
            // success: false,
            // error: "Internal Server Error",
        // });
    // }
// };

// const unarchiveEmployeeController = async (req, res) => {
    // try {
        // const { id } = req.params;
        // const employee = await unarchiveEmployee(id);
// 
        // return res.json({
            // success: true,
            // message: "Employee unarchived successfully",
            // data: employee,
        // });
// 
    // } catch (error) {
        // if (error.message === "Employee not found" || error.message === "Employee is not archived") {
            // return res.status(404).json({
                // success: false,
                // error: error.message,
            // });
        // }
        // return res.status(500).json({
            // success: false,
            // error: "Internal Server Error",
        // });
    // }
// };
// 
module.exports = {
    createNewEmployee,
    getAllEmployeesController,
    getEmployeesController,
    updateEmployeeController,
    // softDeleteEmployeeController,
    // restoreEmployeeController,
    // archiveEmployeeController,
    // unarchiveEmployeeController,
};

const formSubmissionService = require('../services/formSubmissionService');
const buildFullName = require('../utils/buildName');

const createSubmission = async (req, res) => {
    try {
        const submission = await formSubmissionService.createSubmission(req.validatedData);
        return res.status(201).json({
            success: true,
            message: 'Form submitted successfully!',
            data: submission,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
};

const getAllSubmissions = async (req, res) => {
    try {
        const submissions = await formSubmissionService.getAllSubmissions();
        return res.status(200).json({
            success: true,
            message: "All submissions fetched successfully",
            data: submissions,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch all submissions"
        });
    }
};

const getSubmissions = async (req, res) => {
    try {
        const sortType = req.query.sortType || 'created_at';
        const sortDirection = req.query.sortDirection?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
        const status = req.query.status;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search || "";

        const result = await formSubmissionService.getSubmissions({
            status,
            sortType,
            sortDirection,
            page,
            limit,
            search,
        });

        return res.json({
            success: true,
            message: 'Form submissions retrieved successfully',
            data: result
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
};

const getAcceptedSubmissionsController = async (req, res) => {
    try {
        const submissions = await formSubmissionService.getAcceptedSubmissionsService();
        return res.status(200).json({
            success: true,
            message: "All accepted submissions fetched successfully",
            data: submissions,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch accepted submissions"
        });
    }
};

const updateFormSubmission = async (req, res) => {
    try {
        const { id } = req.params;

        const employeeData = req.user || null;

        const submission = await formSubmissionService.updateFormSubmission(id, req.validatedData, employeeData);

        return res.json({
            success: true,
            message: "Form submission updated successfully",
            data: submission,
        });
    } catch (error) {
        console.error(error);
        if (error.message === "Submission not found" || error.message === "Cannot update a deleted submission") {
            return res.status(404).json({
                success: false,
                error: error.message
            });
        }
        return res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
};

module.exports = {
    createSubmission,
    getAllSubmissions,
    getSubmissions,
    getAcceptedSubmissionsController,
    updateFormSubmission,
};

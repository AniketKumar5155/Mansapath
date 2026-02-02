
const formSubmissionService = require('../services/formSubmissionService');
const sendEmail = require("../utils/sendEmail")
const createSubmission = async (req, res) => {
    try {
        const submission = await formSubmissionService.createSubmission(req.validatedData);

        if (req.validatedData.email) {
            try {
                await sendEmail({
                    to: req.validatedData.email,
                    subject: 'Form Submission Successful',
                    text: 'Your form has been submitted successfully. Thank you!',
                    html: '<p>Your form has been submitted successfully. Thank you!</p>'
                });
            } catch (emailError) {
                console.error('Failed to send success email:', emailError);
            }
        }

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
        const user = req.user;
        const sortType = req.query.sortType || 'created_at';
        const sortDirection = req.query.sortDirection?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
        const status = req.query.status;
        const category = req.query.category;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search || "";

        const result = await formSubmissionService.getSubmissions({
            user,
            status,
            category,
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

const getSubmissionByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const submission = await formSubmissionService.getSubmissionById(id);
        return res.status(200).json({
            success: true,
            message: "Submission fetched successfully",
            data: submission,
        });
    }catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch submission"
        })
    }
}

const getSubmissionCounts = async (req, res) => {
    try {
        const counts = await formSubmissionService.getSubmissionCountsService();

        res.status(200).json({
            success: true,
            data: counts,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch submission counts",
            error: err.message,
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
        }else if(error.message === "Submission is already enrolled"){
            return res.status(400).json({
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
    getSubmissionByIdController,
    getAcceptedSubmissionsController,
    updateFormSubmission,
    getSubmissionCounts,
};

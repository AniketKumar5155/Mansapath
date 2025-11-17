const formSubmissionService = require('../services/formSubmissionService');

const createSubmission = async (req, res) => {
    try {
        const submission = await formSubmissionService.createSubmission(req.validatedData);
        return res.status(201).json({
            success: true,
            message: 'Form submitted successfully!',
            data: submission,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
}

const getAllSubmissions = async (req, res) => {
    try {
        const sortType = req.query.sort || 'created_at';
        const sortDirection = req.query.order?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
        const status = req.query.status;
        const isDeleted = req.query.isDeleted === 'TRUE';
        const isArchived = req.query.isArchived === 'TRUE';

        const submissions = await formSubmissionService.getAllSubmissions({
            status,
            sortType,
            sortDirection,
            isDeleted,
            isArchived,
        });

        return res.json({
            success: true,
            message: 'Form submissions retrieved successfully',
            data: submissions
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
}

const softDeleteSubmission = async (req, res) => {
    try {
        const { id } = req.params;
        const submission = await formSubmissionService.softDeleteSubmission(id);

        return res.json({
            success: true,
            message: 'Form submission soft deleted successfully',
            data: submission,
        });
    } catch (error) {
        console.error(error);

        if (error.message === "Submission not found" || error.message === "Submission already deleted") {
            return res.status(404).json({
                success: false,
                error: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
}

const restoreSubmission = async (req, res) => {
    try {
        const { id } = req.params;
        const submission = await formSubmissionService.restoreSubmission(id);

        return res.json({
            success: true,
            message: 'Form submission restored successfully',
            data: submission,
        });
    } catch (error) {
        if (error.message === "Submission not found" || error.message === "Submission is not deleted") {
            return res.status(404).json({
                success: false,
                error: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
}

const archiveSubmission = async (req, res) => {
    const { id } = req.params;
    try {
        const submission = await formSubmissionService.archiveSubmission(id);
        return res.json({
            success: true,
            message: 'Form submission archived successfully',
            data: submission,
        });
    } catch (error) {
        if (error.message === "Submission not found" || error.message === "Submission already archived") {
            return res.status(404).json({
                success: false,
                error: error.message,
            });
        }
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
}

const unarchiveSubmission = async (req, res) => {
    const { id } = req.params;
    try{
        const submission = await formSubmissionService.unarchiveSubmission(id);
        return res.json({
            success: true,
            message: 'Form submission unarchived successfully',
            data: submission,
        });
    }catch(error){
        if(error.message === "Submission not found" || error.message === "Submission is not archived"){
            return res.status(404).json({
                success: false,
                error: error.message,
            })
        }
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
}

const updateFormSubmission = async (req, res) => {
    try {
        const { id } = req.params;

        const submission = await formSubmissionService.updateFormSubmission(id, req.validatedData);

        return res.json({
            success: true,
            message: "Form submission updated successfully",
            data: submission,
        });

    } catch (error) {
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
    softDeleteSubmission,
    restoreSubmission,
    archiveSubmission,
    unarchiveSubmission,
    updateFormSubmission,
};

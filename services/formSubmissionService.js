const { FormSubmission } = require('../models');
const validateId = require('../utils/validateId');

const createSubmission = async (submissionData) => {
    const submission = await FormSubmission.create(submissionData);
    return submission;
};

const getAllSubmissions = async ({
    sortType = 'created_at',
    sortDirection = 'DESC',
    status,
}) => {

    const safeOrder = sortDirection.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    const whereClause = {};

    if (status) {
        whereClause.status = status;
    }

    const submissions = await FormSubmission.findAll({
        where: whereClause,
        order: [[sortType, safeOrder]],
    });

    return submissions;
};


const softDeleteSubmission = async (id) => {
    validateId(id);
    const submission = await FormSubmission.findByPk(id);
    if(!submission){
        throw new Error("Submission not found");
    }
    if(submission.is_deleted){
        throw new Error("Submission already deleted");
    }
    submission.is_deleted = true;
    await submission.save();
    return submission;
}

const restoreSubmission = async (id) => {
    validateId(id);
    const submission = await FormSubmission.findByPk(id);
    if(!submission){
        throw new Error("Submission not found");
    }
    if(!submission.is_deleted){
        throw new Error("Submission is not deleted");
    }
    submission.is_deleted = false;
    await submission.save();
    return submission;
}

const archiveSubmission = async (id) => {
    validateId(id);
    const submission = await FormSubmission.findByPk(id);
    if(!submission){
        throw new Error("Submission not found");
    }
    if(submission.is_archived){
        throw new Error("Submission already archived");
    }
    submission.is_archived = true;
    await submission.save();
    return submission;
}

const unarchiveSubmission = async (id) => {
    validateId(id);
    const submission = await FormSubmission.findByPk(id);
    if(!submission){
        throw new Error("Submission not found");
    }
    if(!submission.is_archived){
        throw new Error("Submission is not archived");
    }
    submission.is_archived = false;
    await submission.save();
    return submission;
}

const updateFormSubmission = async (id, updatedData) => {
    validateId(id);
    const submission = await FormSubmission.findByPk(id);
    if (!submission) {
        throw new Error("Submission not found");
    }
    if (submission.is_deleted) {
        throw new Error("Cannot update a deleted submission");
    }

    await submission.update(updatedData);
    return submission;
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

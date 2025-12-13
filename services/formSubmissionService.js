const { FormSubmission } = require('../models');
const validateId = require('../utils/validateId');
const { Op } = require("sequelize");


const createSubmission = async (submissionData) => {
    const submission = await FormSubmission.create(submissionData);
    return submission;
};

const getAllSubmissions = async () => {
    const submissions = await FormSubmission.findAll();
    return submissions;
}
const getSubmissions = async ({
    sortType = 'created_at',
    sortDirection = 'DESC',
    status,
    page = 1,
    limit = 10,
    search = "",
}) => {

    const safeOrder = sortDirection.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    let whereClause = {
        [Op.or]: [
            { status: { [Op.ne]: 'OPEN' } },
            { status: null }
        ]
    };

    if (status) {
        whereClause = {
            ...whereClause,
            status: status
        };
    }

    if (search.trim() !== "") {
        whereClause[Op.or] = [
            { first_name: { [Op.like]: `%${search}%` } },
            { middle_name: { [Op.like]: `%${search}%` } },
            { last_name: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } },
            { phone_number: { [Op.like]: `%${search}%` } },
        ];
    }

    const offset = (page - 1) * limit;

    const { rows, count } = await FormSubmission.findAndCountAll({
        where: whereClause,
        order: [[sortType, safeOrder]],
        limit,
        offset
    });

    return {
        submissions: rows,
        totalItems: count,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        limit,
    };
};

const acceptSubmissionService = async (id, employeeName) => {
    validateId(id);

    const submission = await FormSubmission.findByPk(id);
    if (!submission) {
        throw new Error("Submission not found");
    }

    if (submission.status === "OPEN") {
        throw new Error("Submission already marked OPEN");
    }

    await submission.update({
        status: "OPEN",
        accepted_by: employeeName,
        accepted_at: new Date(),
    });

    return submission;
};


// const softDeleteSubmission = async (id) => {
// validateId(id);
// const submission = await FormSubmission.findByPk(id);
// if (!submission) {
// throw new Error("Submission not found");
// }
// if (submission.is_deleted) {
// throw new Error("Submission already deleted");
// }
// submission.is_deleted = true;
// await submission.save();
// return submission;
// }
// 
// const restoreSubmission = async (id) => {
// validateId(id);
// const submission = await FormSubmission.findByPk(id);
// if (!submission) {
// throw new Error("Submission not found");
// }
// if (!submission.is_deleted) {
// throw new Error("Submission is not deleted");
// }
// submission.is_deleted = false;
// await submission.save();
// return submission;
// }
// 
// const archiveSubmission = async (id) => {
// validateId(id);
// const submission = await FormSubmission.findByPk(id);
// if (!submission) {
// throw new Error("Submission not found");
// }
// if (submission.is_archived) {
// throw new Error("Submission already archived");
// }
// submission.is_archived = true;
// await submission.save();
// return submission;
// }
// 
// const unarchiveSubmission = async (id) => {
// validateId(id);
// const submission = await FormSubmission.findByPk(id);
// if (!submission) {
// throw new Error("Submission not found");
// }
// if (!submission.is_archived) {
// throw new Error("Submission is not archived");
// }
// submission.is_archived = false;
// await submission.save();
// return submission;
// }

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
    getSubmissions,
    getAllSubmissions,
    acceptSubmissionService,
    // softDeleteSubmission,
    // restoreSubmission,
    // archiveSubmission,
    // unarchiveSubmission,
    updateFormSubmission,
};
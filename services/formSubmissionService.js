const { FormSubmission } = require('../models');
const validateId = require('../utils/validateId');
const { Op } = require("sequelize");
const buildFullName = require("../utils/buildName");

const createSubmission = async (submissionData) => {
    const submission = await FormSubmission.create(submissionData);
    return submission;
};

const getAllSubmissions = async () => {
    const submissions = await FormSubmission.findAll();
    return submissions;
};

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
        whereClause = { ...whereClause, status };
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

const getAcceptedSubmissionsService = async () => {
    const acceptedSubmissions = await FormSubmission.findAll({
        where: { status: "OPEN" },
        order: [["accepted_at", "DESC"]],
    });
    return acceptedSubmissions;
};

const updateFormSubmission = async (id, updatedData, employeeData = null) => {
    validateId(id);

    const submission = await FormSubmission.findByPk(id);
    if (!submission) {
        throw new Error("Submission not found");
    }

    if (submission.is_deleted) {
        throw new Error("Cannot update a deleted submission");
    }

    if (updatedData.status === "OPEN" && submission.status !== "OPEN") {
        updatedData.accepted_at = new Date();

        if (employeeData) {
            updatedData.accepted_by = buildFullName(employeeData);
        } else if (updatedData.employee) {
            updatedData.accepted_by = buildFullName(updatedData.employee);
        } else {
            updatedData.accepted_by = "SYSTEM";
        }
    }

    await submission.update(updatedData);
    return submission;
};

module.exports = {
    createSubmission,
    getSubmissions,
    getAllSubmissions,
    getAcceptedSubmissionsService,
    updateFormSubmission,
};

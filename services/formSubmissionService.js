const { FormSubmission, Sequelize } = require('../models');
const validateId = require('../utils/validateId');
const { Op } = require("sequelize");
const buildFullName = require("../utils/buildName");

// Creating a new form submission
const createSubmission = async (submissionData) => {
    const submission = await FormSubmission.create(submissionData);
    return submission;
};

// Fetching all form submissions\
const getAllSubmissions = async () => {
    const submissions = await FormSubmission.findAll();

    // const countQuery = Sequelize.QueryError("SELECT COUNT(id) AS total FROM FormSubmissions GROUP BY status");
    return submissions;
};

const getSubmissions = async ({
    user,
    sortType = 'created_at',
    sortDirection = 'DESC',
    status,
    category,
    page = 1,
    limit = 10,
    search = "",
}) => {
    const safeOrder = sortDirection.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    let whereClause = {};

    let allowedStatuses = [];
    if (user.role === "SUPERADMIN") {
        allowedStatuses = ["PENDING", "CLOSED", "OPEN", null];
    } else {
        allowedStatuses = ["PENDING", null];
    }
    let effectiveStatus = [];
    if (!status) {
        effectiveStatus = allowedStatuses;
    } else if (status === "PENDING" && allowedStatuses.includes("PENDING")) {
        effectiveStatus = ["PENDING"];
    } else if (status === "NULL" && allowedStatuses.includes(null)) {
        effectiveStatus = [null];
    } else if (allowedStatuses.includes(status)) {
        effectiveStatus = [status];
    } else {
        effectiveStatus = allowedStatuses;
    }

    whereClause[Op.or] = effectiveStatus.map(s => s === null ? { status: { [Op.is]: null } } : { status: s });

    if (category) {
        whereClause.category = category;
    }

    if (search.trim() !== "") {
        whereClause[Op.and] = [
            {
                [Op.or]: [
                    { first_name: { [Op.like]: `%${search}%` } },
                    { middle_name: { [Op.like]: `%${search}%` } },
                    { last_name: { [Op.like]: `%${search}%` } },
                    { email: { [Op.like]: `%${search}%` } },
                    { phone_number: { [Op.like]: `%${search}%` } },
                ],
            },
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
        appliedFilters: {
            status: effectiveStatus.map(s => (s === null ? 'NULL' : s)),
            category: category || 'ALL',
            sortType,
            sortDirection: safeOrder,
            search: search || '',
        },
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

    if (updatedData.status === "OPEN" && submission.status === "OPEN") {
        throw new Error("Submission is already enrolled");
    }

    if (updatedData.status === "OPEN" && submission.status !== "OPEN") {
        updatedData.accepted_at = new Date();

        if (employeeData) {
            updatedData.accepted_by = buildFullName(employeeData);
        } else if (updatedData.employee) {
            updatedData.accepted_by = buildFullName(updatedData.employee);
        } else {
            updatedData.accepted_by = "Error: Unknown Employee";
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

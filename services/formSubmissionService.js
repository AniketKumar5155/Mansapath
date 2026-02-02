const { FormSubmission, SubmissionIssue, Issue, IssueCategory, Sequelize } = require('../models');
const validateId = require('../utils/validateId');
const { Op } = require("sequelize");
const buildFullName = require("../utils/buildName");

const createSubmission = async (submissionData) => {
    const sequelize = FormSubmission.sequelize;
    let submission;

    await sequelize.transaction(async (t) => {
        submission = await FormSubmission.create(submissionData, { transaction: t });

        if (submissionData.issues?.length) {
            const rows = submissionData.issues.map(issueId => ({
                submission_id: submission.id,
                issue_id: issueId,
            }));

            await SubmissionIssue.bulkCreate(rows, { transaction: t });
        }
    });

    return submission;
};


const getAllSubmissions = async () => {
    const submissions = await FormSubmission.findAll({
        include: [
            {
                model: Issue,
                through: { attributes: [] },
                include: [
                    {
                        model: IssueCategory,
                        attributes: ['id', 'name']
                    }
                ],
                attributes: ['id', 'name']
            }
        ]
    });
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
        allowedStatuses = ["ENROLLED", "PENDING", "REJECTED", null];
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
        distinct: true,
        where: whereClause,
        order: [[sortType, safeOrder]],
        limit,
        offset,
        include: [
            {
                model: Issue,
                through: { attributes: [] },
                include: [
                    {
                        model: IssueCategory,
                        attributes: ['id', 'name']
                    }
                ],
                attributes: ['id', 'name']
            }
        ]
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

const getSubmissionById = async (id) => {
    validateId(id);

    const submission = await FormSubmission.findByPk(id, {
        include: [
            {
                model: Issue,
                through: { attributes: [] },
                include: [
                    {
                        model: IssueCategory,
                        attributes: ["id", "name"],
                    }
                ],
                attributes: ['id', 'name']
            }
        ]

    });
    if (!submission) {
        throw new Error("Submission not found");
    }
    return submission;
};

const getSubmissionCountsService = async () => {
    const sequelize = FormSubmission.sequelize;

    const categories = await IssueCategory.findAll({ attributes: ['id', 'name'] });

    const categoryCases = categories
        .map(cat => `SUM(CASE WHEN fs.status = 'ENROLLED' AND ic.id = ${cat.id} THEN 1 ELSE 0 END) AS "${cat.name}"`)
        .join(', ');

    const query = `
        SELECT
            fs.status,
            COUNT(*) AS total_count,
            ${categoryCases}
        FROM FormSubmissions fs
        LEFT JOIN SubmissionIssues si ON fs.id = si.submission_id
        LEFT JOIN Issues i ON si.issue_id = i.id
        LEFT JOIN IssueCategories ic ON i.issue_category_id = ic.id
        GROUP BY fs.status
        ORDER BY 
            CASE 
                WHEN fs.status IS NULL THEN 1
                WHEN fs.status = 'PENDING' THEN 2
                WHEN fs.status = 'REJECTED' THEN 3
                WHEN fs.status = 'ENROLLED' THEN 4
                ELSE 5
            END
    `;

    const counts = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

    const formatted = counts.map(row => {
        const { status, total_count, ...categories } = row;
        return {
            status: status === null ? 'NULL' : status,
            total: Number(total_count),
            categories: status === 'ENROLLED'
                ? Object.fromEntries(
                    Object.entries(categories).map(([k, v]) => [k, Number(v)])
                )
                : {}
        };
    });

    return formatted;
};


const updateFormSubmission = async (id, updatedData, employeeData = null) => {
    validateId(id);

    const sequelize = FormSubmission.sequelize;

    return await sequelize.transaction(async (t) => {
        const submission = await FormSubmission.findByPk(id, { transaction: t });
        if (!submission) {
            throw new Error("Submission not found");
        }

        if (Array.isArray(updatedData.issues)) {
            await SubmissionIssue.destroy({
                where: { submission_id: id },
                transaction: t
            });

            if (updatedData.issues.length > 0) {
                const rows = updatedData.issues.map(issueId => ({
                    submission_id: id,
                    issue_id: issueId,
                }));

                await SubmissionIssue.bulkCreate(rows, { transaction: t });
            }
        }

        if (updatedData.status === "ENROLLED" && submission.status === "ENROLLED") {
            throw new Error("Submission is already enrolled");
        }

        if (updatedData.status === "ENROLLED" && submission.status !== "ENROLLED") {
            updatedData.accepted_at = new Date();
            updatedData.accepted_by = employeeData
                ? buildFullName(employeeData)
                : updatedData.employee
                    ? buildFullName(updatedData.employee)
                    : "Error: Unknown Employee";
        }

        await submission.update(updatedData, { transaction: t });
        return submission;
    });
};


module.exports = {
    createSubmission,
    getSubmissions,
    getAllSubmissions,
    getSubmissionById,
    updateFormSubmission,
    getSubmissionCountsService,
};

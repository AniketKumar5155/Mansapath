const { UserQuery } = require("../models")

const createUserQueryService = async (userQueryData) => {
    const userQuery = await UserQuery.create(userQueryData);
    return userQuery;
}

const getAllUserQueryService = async (
    page = 1,
    limit = 10,
    search = "",
    status,
    sortedType,
    sortedDirection,
) => {
    const safeSortOrder = sortedDirection.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    let whereClause = {}

    if (status) {
        whereClause.status = status;
    }

    if (search.trim() !== "") {
        whereClause[Op.and] = [
            {
                [Op.or]: [
                    { name: { [Op.like]: `%${search}%` } },
                    { email: { [Op.like]: `%${search}%` } },
                    { phone_number: { [Op.like]: `%${search}%` } },
                    { message: { [Op.like]: `%${search}%` } },
                ]
            }
        ]
    }

    const offset = (page - 1) * limit;

    const userQueries = await UserQuery.findAll({
        distinct: true,
        where: whereClause,
        page: page,
        limit: limit,
        order: [[sortedType, safeSortOrder]],
        offset,
    });
    return userQueries;
}

module.exports = {
    createUserQueryService,
    getAllUserQueryService,
}

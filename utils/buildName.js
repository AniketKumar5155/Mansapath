const buildFullName = (user) => {
    return [user.first_name, user.middle_name, user.last_name]
        .filter(Boolean)
        .join(" ");
};

module.exports = buildFullName;

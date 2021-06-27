module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
        username: {
            field: "username",
            type: Sequelize.STRING
        },
        password: {
            field: "password",
            type: Sequelize.STRING
        },
        phone_number: {
            field: "phone_number",
            type: Sequelize.STRING
        },
        email: {
            field: "email",
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    });

    return User;
};
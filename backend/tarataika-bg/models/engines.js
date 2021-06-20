module.exports = (sequelize, Sequelize) => {
    const Engine = sequelize.define('engines', {
        id: {
            field: "id",
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        type: {
            field: "type",
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    });

    return Engine;
};
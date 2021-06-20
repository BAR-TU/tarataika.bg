module.exports = (sequelize, Sequelize) => {
    const Ecategory = sequelize.define('eurocategories', {
        id: {
            field: "id",
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        category: {
            field: "category",
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    });

    return Ecategory;
};
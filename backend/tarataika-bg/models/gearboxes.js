module.exports = (sequelize, Sequelize) => {
    const Gearbox = sequelize.define("gearboxes", {
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

    return Gearbox;
};
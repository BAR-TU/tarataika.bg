module.exports = (sequelize, Sequelize) => {
    const Make = sequelize.define("makes", {
        make_id: {
            field: "make_id",
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        make: {
            field: "make",
            type: Sequelize.STRING,
        }
    }, {
        timestamps: false
    });
  
    return Make;
};
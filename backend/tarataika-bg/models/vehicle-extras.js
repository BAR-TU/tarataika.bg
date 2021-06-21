module.exports = (sequelize, Sequelize) => {
    const VehicleExtras = sequelize.define("vehicle_extras", {
        extra_id: {
            field: "extra_id",
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        extra: {
            field: "extra",
            type: Sequelize.STRING,
        }
    }, {
        timestamps: false
    });
  
    return VehicleExtras;
};
module.exports = (sequelize, Sequelize) => {
    const Model = sequelize.define("models", {
        model_id: {
            field: "model_id",
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        model: {
            field: "model",
            type: Sequelize.STRING
        },
        make_id: {
            field: "make_id",
            type: Sequelize.INTEGER
        },
        vehicle_category_id: {
            field: "vehicle_category_id",
            type: Sequelize.INTEGER
        }
    }, {
        timestamps: false
    });
  
    return Model;
};
module.exports = (sequelize, Sequelize) => {
    const Location = sequelize.define("locations", {
        id: {
            field: "id",
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        location: {
            field: "location",
            type: Sequelize.STRING
        },
        coordinates: {
            field: "coordinates",
            type: Sequelize.STRING
        }
    },{
        timestamps: false
    });

return Location;
};
module.exports = (sequelize, Sequelize) => { 
const Listings = sequelize.define("listings",{

        id: {
            field: "id",
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        make_id: {
            field: "make_id",
            type: Sequelize.INTEGER
        },
        model_id: {
            field: "model_id",
            type: Sequelize.INTEGER
        },
        vehicle_category_id: {
            field: "vehicle_category_id",
            type: Sequelize.INTEGER
        },
        price: {
            field: "price",
            type: Sequelize.STRING
        },
        engine_id: {
            field: "engine_id",
            type: Sequelize.STRING
        },
        power: {
            field: "power",
            type: Sequelize.INTEGER
        },
        first_registration: {
            field: "first_registration",
            type: Sequelize.INTEGER
        },
        mileage: {
            field: "mileage",
            type: Sequelize.STRING
        },
        user_id: {
            field: "user_id",
            type: Sequelize.INTEGER
        },
        gearbox_id: {
            field: "gearbox_id",
            type: Sequelize.INTEGER
        },
        vip_status: {
            field: "vip_status",
            type: Sequelize.BOOLEAN
        },
        views: {
            field: "views",
            type: Sequelize.INTEGER
        },
        location_id: {
            field: "location_id",
            type: Sequelize.INTEGER
        },
        status: {
            field: "status",
            type: Sequelize.BOOLEAN
        },
        paint_id: {
            field: "paint_id",
            type: Sequelize.INTEGER
        },
        info: {
            field: "info",
            type: Sequelize.STRING
        },
        eurocategory: {
            field: "eurocategory",
            type: Sequelize.INTEGER
        }
    }, {
        timestamps: false
    });
return Listings;
};
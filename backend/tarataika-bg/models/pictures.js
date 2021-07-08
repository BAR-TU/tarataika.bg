module.exports = (sequelize, Sequelize) => { 
    const Pictures = sequelize.define("pictures",{
    
            id: {
                field: "id",
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            path: {
                field: "path",
                type: Sequelize.STRING
            },
            type: {
                field: "type",
                type: Sequelize.STRING
            },
            img: {
                field: "img",
                type: Sequelize.BLOB('long')
            },
            listing_id: {
                field: "listing",
                type: Sequelize.INTEGER
            }
        }, {
            timestamps: false
        });
    return Pictures;
    };
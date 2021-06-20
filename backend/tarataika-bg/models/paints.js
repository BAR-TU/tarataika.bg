module.exports = (sequelize, Sequelize) => {
    const Paint = sequelize.define('paints', {
        id: {
            field: "id",
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        paint: {
            field: "paint",
            type: Sequelize.STRING
        }
    },{
        
        timestamps: false
    });
    return Paint;
};
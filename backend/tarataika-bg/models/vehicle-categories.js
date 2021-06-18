module.exports = (sequelize, Sequelize) => {
    const Categories = sequelize.define("vehicle_categories", {
      vehicle_category_id: {
        field: "vehicle_category_id", 
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      vehicle_category: {
        field: "vehicle_category",
        type: Sequelize.STRING
      }
      
    }, {
      timestamps: false
    });
    
    return Categories;
  };
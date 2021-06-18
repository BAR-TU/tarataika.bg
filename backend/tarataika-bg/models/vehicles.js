module.exports = (sequelize, Sequelize) => {
    const Vehicles = sequelize.define("vehicles", {
      id: {
        field: "id", 
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      make: {
        field: "make",
        type: Sequelize.STRING
      },
      model: {
        field: "model",
        type: Sequelize.STRING
      }
      
    }, {
      timestamps: false
    });
    
    return Vehicles;
  };
module.exports = (sequelize, Sequelize) => {
    const Cars = sequelize.define('cars', {
      id: {
        field: 'id', 
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
    
    return Cars;
  };
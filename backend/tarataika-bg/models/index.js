const dbConfig = require('../config/db.config');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.vehicles = require('./vehicles.js')(sequelize, Sequelize);
db.vehiclesCategories = require('./vehicle-categories.js')(sequelize, Sequelize);
db.makes = require('./makes.js')(sequelize, Sequelize);
db.models = require('./models.js')(sequelize, Sequelize);

db.vehiclesCategories.belongsToMany(db.makes, {
  through: 'makes_vehicles_categories',
  as: 'makes',
  foreignKey: 'vehicle_category_id'
});

db.makes.belongsToMany(db.vehiclesCategories, {
  through: 'makes_vehicles_categories',
  as: 'categories',
  foreignKey: 'make_id'
});


module.exports = db;
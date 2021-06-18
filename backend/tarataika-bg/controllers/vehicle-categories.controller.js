const db = require('../models');
const Categories = db.vehiclesCategoies;
const Op = db.Sequelize.Op;

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const vehicle_category = req.query.vehicle_category;
  var condition = vehicle_category ? { vehicle_category: { [Op.iLike]: `%${vehicle_category}%` } } : null;

  Categories.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cars."
      });
    });
};
const db = require('../models');
const Makes = db.makes;
const Categories = db.vehiclesCategories;
const Op = db.Sequelize.Op;

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const vehicle_category = req.query.vehicle_category;
  var condition = vehicle_category ? { vehicle_category: { [Op.iLike]: `%${vehicle_category}%` } } : null;

  Categories.findAll({
    include: [
      {
        model: Makes,
        as: "makes",
        attributes: ["make_id", "make"],
        through: {
          attributes: ["make_id", "vehicle_category_id"],
        }
      },
    ]
     //where: condition
     })
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
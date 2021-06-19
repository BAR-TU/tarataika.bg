const db = require('../models');
const Models = db.models;
const Op = db.Sequelize.Op;

// Retrieve all Tutorials from the database.
exports.findAllByCategoryAndMake = (req, res) => {

    const category = req.params.category;
    const make = req.params.make;
  
    Models.findAll({ where: { vehicle_category_id: category, make_id: make } })
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
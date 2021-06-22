const db = require('../models');
const Paints = db.paints;
const Op = db.Sequelize.Op;

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    Paints.findAll()
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
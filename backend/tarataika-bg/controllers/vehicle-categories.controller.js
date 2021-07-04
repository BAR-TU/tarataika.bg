const db = require('../models');
const Makes = db.makes;
const Categories = db.vehiclesCategories;

exports.findAll = (req, res) => {
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
     })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Възникна грешка докато се сваляха категориите."
      });
    });
};
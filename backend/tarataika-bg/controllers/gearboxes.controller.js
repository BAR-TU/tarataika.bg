const db = require('../models');
const Gearboxes = db.gearboxes;

exports.findAll = (req, res) => {
    Gearboxes.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Възникна грешка докато се сваляха скоростните кутии."
        });
      });
  };
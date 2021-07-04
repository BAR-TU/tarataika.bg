const db = require('../models');
const Locations = db.locations;

exports.findAll = (req, res) => {
    Locations.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Възникна грешка докато се сваляха локациите."
        });
      });
  };
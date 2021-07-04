const db = require('../models');
const Engines = db.engines;

exports.findAll = (req, res) => {
    Engines.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Възникна грешка докато се сваляха двигателите."
        });
      });
  };
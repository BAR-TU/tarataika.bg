const db = require('../models');
const Paints = db.paints;

exports.findAll = (req, res) => {
    Paints.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Възникна грешка докато се сваляха цветовете."
        });
      });
  };
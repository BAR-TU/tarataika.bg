const db = require('../models');
const VehicleExtras = db.vehicleExtras;
const Listings = db.listings;

exports.findAll = (req, res) => {

  VehicleExtras.findAll({
    include: [
        {
          model: Listings,
          as: "listings",
          attributes: ["id", "make_id", "model_id", "vehicle_category_id", "price", "engine_id", "power", "first_registration", "mileage", "user_id", "gearbox_id", "vip_status", "views", "location_id", "status", "paint_id", "info", "eurocategory"],
          through: {
            attributes: ["listing_id", "extra_id"],
          }
        },
      ],
     })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Възникна грешка докато се сваляха екстрите."
      });
    });
};